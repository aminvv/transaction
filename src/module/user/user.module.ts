import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { OtpEntity } from './entities/otp.entity';
import { AuthModule } from '../auth/auth.module';

@Module({       
  imports:[ AuthModule,TypeOrmModule.forFeature([UserEntity,OtpEntity])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
