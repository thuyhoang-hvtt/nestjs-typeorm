import { Module, Global } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { JwtStrategyService } from './auth/jwt-strategy/jwt-strategy.service';
import { UserModule } from '../user/user.module';

@Global()
@Module({
  providers: [AuthService, JwtStrategyService],
  exports: [AuthService],
  imports: [UserModule],
})

export class SharedModule {}
