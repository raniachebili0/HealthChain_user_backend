import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import { LoggingInterceptor } from './Interceptor/LoggingInterceptor';
import path, { join } from 'path';
import * as express from 'express';



async function bootstrap() {
 

  const app = await NestFactory.create(AppModule);


  app.useGlobalInterceptors(new LoggingInterceptor());
  const config = new DocumentBuilder()
  .setTitle('Auth')
  .setDescription('project')
  .setVersion('1.0')
  .addTag('auth')
  .build();
const documentFactory = () => SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, documentFactory);
app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(3000, '0.0.0.0');
}
bootstrap();
