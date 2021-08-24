import { CrudConfigService } from '@nestjsx/crud';

// This workaround makes all crud routes blacklisted by default.
// You can whitelist them on each controller. See UserController for example.
// Keep this before AppModule import
CrudConfigService.load({
  routes: {
    exclude: [
      'getManyBase',
      'getOneBase',
      'createOneBase',
      'createManyBase',
      'updateOneBase',
      'replaceOneBase',
      'deleteOneBase',
    ],
  },
});

import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { CustomLogger } from './modules/logger/custom-logger.service';

async function bootstrap() {
  const logger = new CustomLogger();
  const app = await NestFactory.create(AppModule, { logger });

  if (typeof process.env.ALLOWED_HOST === 'string') {
    app.enableCors({ credentials: true, origin: process.env.ALLOWED_HOST });
  }

  app.use(cookieParser());

  // Setting up Swagger document
  if (process.env.NODE_ENV === 'development') {
    const options = new DocumentBuilder()
      .setTitle('Seed NestJs')
      .setDescription('Auto generated swagger documentation for seed NestJs application')
      .setVersion('1.0')
      .addBearerAuth({ type: 'http', scheme: 'Bearer', bearerFormat: 'JWT' }, 'access-token')
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('swagger', app, document);
  }

  await app.listen(process.env.PORT ?? 8000);
}

void bootstrap();
