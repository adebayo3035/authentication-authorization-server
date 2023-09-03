import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // enable validation Pipe to validats Data before submisssion using the DTOs
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
