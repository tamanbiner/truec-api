import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';

const HOST_PORT = 3007;

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  await app.listen(HOST_PORT);

  Logger.log(`Listening at port: ${HOST_PORT}`);
}
bootstrap();
