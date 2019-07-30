import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from './shared/shared.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IdeasModule } from './ideas/ideas.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [TypeOrmModule.forRoot(), SharedModule, IdeasModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  static HOST: string;
  static PORT: number | string;
  static ISDEV: boolean;

  constructor() {
    AppModule.PORT = AppModule.normalizePort(process.env.PORT);
    AppModule.HOST = process.env.HOST;
    AppModule.ISDEV = process.env.NODE_ENV ? false : true;
  }

  private static normalizePort(param: string | number): string | number {
    const portNumber: number =
      typeof param === 'string' ? parseInt(param, 10) : param;
    if (isNaN(portNumber)) return param;
    else if (portNumber >= 0) return portNumber;
  }
}
