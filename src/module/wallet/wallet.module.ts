import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { WalletEntity } from './entities/wallet.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports:[TypeOrmModule.forFeature([WalletEntity,]),AuthModule],
    
  controllers: [WalletController],
  providers: [WalletService],
})
export class WalletModule {}
