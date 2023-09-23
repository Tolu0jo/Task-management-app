import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config(); 
  const app = await NestFactory.create(AppModule);
  
  if (process.env.NODE_ENV !== 'production') {
     app.enableCors()
  }

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  const port = process.env.PORT || 3000;
  await app.listen(port);
}
bootstrap();
