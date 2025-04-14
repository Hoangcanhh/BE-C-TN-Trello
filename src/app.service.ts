import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  connectToDatabase(): string {
    return 'Connected to MongoDB!';
  }
}
