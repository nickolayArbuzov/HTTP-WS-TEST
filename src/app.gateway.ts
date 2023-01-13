import {
    MessageBody,
    OnGatewayConnection,
    SubscribeMessage,
    WebSocketGateway,
    WsResponse,
  } from '@nestjs/websockets';
  import { Observable } from 'rxjs';
  import { filter, map } from 'rxjs/operators';
  import WebSocket from 'ws';
  import { AppService } from './app.service';
  
  @WebSocketGateway()
  export class AppGateway implements OnGatewayConnection {
    constructor(private readonly app: AppService) {}
  
    handleConnection(client: WebSocket, ...args: any[]) {
      client.send(JSON.stringify({ event: 'connected', data: true }));
    }
  
    @SubscribeMessage('ping')
    handlePing(@MessageBody() data: number): WsResponse<boolean> {
      return { event: 'pong', data: !!(data % 2) };
    }
  
    @SubscribeMessage('message')
    handleMessage(@MessageBody() userId: number): Observable<WsResponse<string>> {
      console.log(userId);
      return this.app.message$.pipe(
        filter((message) => message.userId === userId),
        map((message) => ({ event: 'message', data: message.text })),
      );
    }
  }