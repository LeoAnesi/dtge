import * as clc from 'cli-color';
import { ConsoleLogger, Injectable, Scope } from '@nestjs/common';
import * as winston from 'winston';
import { clsNamespace } from './cls-namespace';

interface TransformableInfo {
  level: string;
  message: string;
  [key: string]: unknown;
}
type Message = string | Record<string, unknown>;

interface LogContent {
  traceId?: string;
  message: Message;
  level: string;
}

const LOG_LEVEL_TO_COLOR: Record<string, clc.Format> = {
  error: clc.red,
  warn: clc.yellow,
  info: clc.green,
  verbose: clc.cyanBright,
  debug: clc.magentaBright,
};

const addTraceId = {
  transform: (logContent: TransformableInfo) => {
    const traceId = clsNamespace.get('traceId') as string | undefined;
    const result = logContent;

    if (traceId !== undefined) {
      result.traceId = traceId;
    }

    return result;
  },
};

const isObjectMessage = (message: Message): message is Record<string, unknown> =>
  message instanceof Object;

const handleObjectMessage = {
  transform: (logContent: LogContent): TransformableInfo => {
    if (isObjectMessage(logContent.message)) {
      logContent = { ...logContent, ...logContent.message };
    }

    return logContent as TransformableInfo;
  },
};

const formatter = ['development', 'test'].includes(process.env.NODE_ENV as string)
  ? winston.format.printf((info) => {
      const colorizer = LOG_LEVEL_TO_COLOR[info.level];

      return (
        Object.keys(info)
          .reverse()
          .reduce((logString, logProperty, index) => {
            if (index > 0) {
              logString += ', ';
            }

            logString += `"${logProperty}": `;

            switch (logProperty) {
              case 'timestamp':
                logString += `"${clc.blueBright(info[logProperty])}"`;
                break;
              case 'context':
                logString += `"${clc.yellow(info[logProperty])}"`;
                break;
              case 'traceId':
                logString += `"${clc.magentaBright(info[logProperty])}"`;
                break;
              default:
                logString += `"${colorizer(info[logProperty])}"`;
            }

            return logString;
          }, '{ ') + ' }'
      );
    })
  : winston.format.json();

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      level: 'silly', // minimum loglevel to display
      format: winston.format.combine(
        handleObjectMessage,
        addTraceId,
        winston.format.timestamp(),
        formatter,
      ),
    }),
  ],
});

@Injectable({ scope: Scope.TRANSIENT })
export class CustomLogger extends ConsoleLogger {
  error(message: Message, trace?: string, context: string | undefined = this.context): void {
    logger.error({ message, trace, context });
  }
  warn(message: Message, context: string | undefined = this.context): void {
    logger.warn({ message, context });
  }
  log(message: Message, context: string | undefined = this.context): void {
    logger.info({ message, context });
  }
  verbose(message: Message, context: string | undefined = this.context): void {
    logger.verbose({ message, context });
  }
  debug(message: Message, context: string | undefined = this.context): void {
    logger.debug({ message, context });
  }
}
