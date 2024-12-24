import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { OtpEntity } from '../user/entities/otp.entity';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from './token.service';
import { WalletEntity } from '../wallet/entities/wallet.entity';
import { WalletModule } from '../wallet/wallet.module';

@Module({
  imports:[TypeOrmModule.forFeature([UserEntity,OtpEntity,WalletEntity]),],
  controllers: [AuthController],
  providers: [AuthService,JwtService,TokenService],
  exports: [AuthService],
})
export class AuthModule {}
