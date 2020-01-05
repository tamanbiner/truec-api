import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: any, res: any, next: () => void) {
    console.log('Request...');
    next();
  }
}
