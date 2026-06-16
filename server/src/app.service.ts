import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getGreet(): string {
    return 'Welcome to the NestJS application!';
  }

  getHealth(): string {
    return 'OK';
  }
}
