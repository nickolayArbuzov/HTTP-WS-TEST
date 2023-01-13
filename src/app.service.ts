import { Injectable } from '@nestjs/common';
import { Subject } from 'rxjs';
import { Message } from './message.interface';

@Injectable()
export class AppService {
  private readonly message$$ = new Subject<Message>();

  readonly message$ = this.message$$.asObservable();

  sendMessage(value: Message): void {
    this.message$$.next(value);
  }

  getHello(): string {
    return 'Hello World!';
  }
}
