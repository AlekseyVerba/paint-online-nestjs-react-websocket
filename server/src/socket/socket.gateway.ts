import { Injectable } from "@nestjs/common";
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Socket,  Server, RemoteSocket} from "socket.io"
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { ConnectedDto } from "./dto/connected.dto"
import { DrawDto, TypesTool } from "./dto/draw.dto"

@WebSocketGateway({
    cors: {
        origin: "*"
    }
})
export class SocketGateway {
    @WebSocketServer()
    server: Server

    @SubscribeMessage('connected')
    async handleConnect(
        @MessageBody() data: ConnectedDto,
        @ConnectedSocket() socket: Socket
        ): Promise<any> {
            socket.data.name = data.name
            socket.data.roomID = data.id
        
        let roomUsers = await this.server.in(data.id).fetchSockets()
        const users = roomUsers.map(user => {
            return {
                name: user.data.name,
                id: user.id
            }
        })
        users[users.length] = {
            name: socket.data.name,
            id: socket.id
        }
        socket.join(data.id)
        socket.to(data.id).emit("connect-person", {name: data.name, id: socket.id})
        return users
    }

    @SubscribeMessage('draw')
    handleDraw(
        @MessageBody() data: DrawDto,
        @ConnectedSocket() socket: Socket
        ): undefined {
        socket.to(data.id).emit("draw", data)
        return
    }   

    @SubscribeMessage('update')
    handleUpdate(
        @MessageBody() data: any,
        @ConnectedSocket() socket: Socket
        ): undefined {
        socket.to(data.id).emit("update", data.lastUpdate)
        return
    }     

    handleConnection(): string {
        return "Подключение установленое"
    }

    handleDisconnect(
        @ConnectedSocket() socket: Socket
    ): string {
        socket.to(socket.data.roomID).emit("leave-user", {id: socket.id, name: socket.data.name})
        return "leave"
    }

}