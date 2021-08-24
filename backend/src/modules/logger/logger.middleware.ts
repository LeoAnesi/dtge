import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { randomBytes } from 'crypto';
import { clsNamespace } from './cls-namespace';
import { CustomLogger } from './custom-logger.service';

const generateId = () => {
  return randomBytes(16).toString('hex');
};

const bindClsNamespaceToCurrentRequest = (req: Request, res: Response) => {
  // req and res are event emitters. We want to access CLS context inside of their event callbacks
  clsNamespace.bindEmitter(req);
  clsNamespace.bindEmitter(res);
};

const computeRequestEndLogContent = (req: Request, res: Response, requestStartTime: number) => {
  const requestEndTime = new Date().getTime();
  const executionDurationMs = requestEndTime - requestStartTime;

  const { url, method } = req;
  const { statusCode, statusMessage } = res;
  const message = 'Ingoing request execution end';

  return { method, url, statusCode, statusMessage, executionDurationMs, message };
};

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private logger: CustomLogger) {
    this.logger.setContext('LoggerMiddleware');
  }

  use(req: Request, res: Response, next: () => void): void {
    bindClsNamespaceToCurrentRequest(req, res);
    const traceID = generateId();

    const requestStartTime = new Date().getTime();
    res.on('finish', () => {
      const requestEndLogContent = computeRequestEndLogContent(req, res, requestStartTime);
      this.logger.log(requestEndLogContent);
    });

    clsNamespace.run(() => {
      clsNamespace.set('traceId', traceID);
      next();
    });
  }
}
