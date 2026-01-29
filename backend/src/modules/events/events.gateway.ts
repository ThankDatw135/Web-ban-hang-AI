import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private connectedClients: Map<string, string> = new Map(); // socketId -> userId

  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async handleConnection(client: Socket) {
    try {
      const token = client.handshake.auth?.token;
      if (!token) {
        client.disconnect();
        return;
      }

      const payload = this.jwtService.verify(token, {
        secret: this.configService.get('jwt.secret'),
      });

      this.connectedClients.set(client.id, payload.sub);
      client.join(`user:${payload.sub}`);
      console.log(`Client connected: ${client.id} (User: ${payload.sub})`);
    } catch {
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    this.connectedClients.delete(client.id);
    console.log(`Client disconnected: ${client.id}`);
  }

  // Emit AI job status updates
  emitAIJobStatus(userId: string, data: { jobId: string; status: string; progress?: number }) {
    this.server.to(`user:${userId}`).emit('ai:job:status', data);
  }

  // Emit AI job result
  emitAIJobResult(userId: string, data: { jobId: string; status: string; resultUrl?: string }) {
    this.server.to(`user:${userId}`).emit('ai:job:result', data);
  }

  // Emit chat message
  emitChatMessage(userId: string, data: { sessionId: string; message: any }) {
    this.server.to(`user:${userId}`).emit('chat:message', data);
  }

  // Emit order status update
  emitOrderStatus(userId: string, data: { orderId: string; status: string }) {
    this.server.to(`user:${userId}`).emit('order:status', data);
  }

  // Emit payment status
  emitPaymentStatus(userId: string, data: { orderId: string; paymentStatus: string }) {
    this.server.to(`user:${userId}`).emit('payment:status', data);
  }

  @SubscribeMessage('ping')
  handlePing(@ConnectedSocket() client: Socket) {
    return { event: 'pong', data: { timestamp: Date.now() } };
  }
}
