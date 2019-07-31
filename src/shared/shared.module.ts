import { Module, Global } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { JwtStrategyService } from './auth/jwt-strategy/jwt-strategy.service';
import { UserModule } from '../user/user.module';
import { MapperService } from './mapper/mapper.service';

@Global()
@Module({
  providers: [AuthService, JwtStrategyService, MapperService],
  exports: [AuthService, MapperService],
  imports: [UserModule],
})

export class SharedModule {}
