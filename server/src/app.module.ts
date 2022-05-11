import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SocketModule } from "./socket/socket.module"
import { ImageModule } from "./imagesModule/image.module"
import { ServeStaticModule } from "@nestjs/serve-static"
import { join } from "path"

@Module({
  imports: [
              SocketModule, 
              ImageModule,
              ServeStaticModule.forRoot({
                rootPath: join(__dirname, 'static'),
              })
           ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
