import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import express from 'express';
import Logging from 'library/Logging';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.enableCors({
    origin: ['http://localhost:3000'],
    credentials: true,
  });

  const initSwagger = (app: INestApplication) => {
    const config = new DocumentBuilder()
      .setTitle('Guess the location')
      .setDescription('Guess the location API')
      .setVersion('1.0')
      .addTag('Guess Location')
      .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        in: 'header',
        name: 'Authorization',
      })
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  };

  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  app.use('/files', express.static('files'));

  initSwagger(app);

  const PORT = process.env.PORT || 8080;
  await app.listen(PORT);
  Logging.info(`I am listening on: ${await app.getUrl()}`);
}
bootstrap();
