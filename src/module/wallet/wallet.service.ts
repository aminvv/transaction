import { Inject, Injectable, Scope, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WalletEntity } from './entities/wallet.entity';
import { DataSource, Repository } from 'typeorm';
import { AuthService } from '../auth/auth.service';
import { DepositDto } from './dto/wallet.dot';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { AuthMessage } from '@/common/enums/message.enum';
import { UserEntity } from '../user/entities/user.entity';
import { WalletType } from './enum/walletType.enum';

@Injectable({ scope: Scope.REQUEST })
export class WalletService {
    constructor(
        @Inject(REQUEST) private request: Request,
        @InjectRepository(WalletEntity) private walletRepository: Repository<WalletEntity>,
        private authService: AuthService,
        private dataSource: DataSource,
    ) { }

   
    async deposit(depositDto: DepositDto) {
        const user = this.request.user;
        const { amount } = depositDto;
        const wallet = await this.walletRepository.findOneBy({ userId: user.id });
        if (!wallet) throw new UnauthorizedException(AuthMessage.loginRequired);
    
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
    
        try {
            const userData = await queryRunner.manager.findOneBy(WalletEntity, { userId: user.id });
            if (!userData) {
                throw new UnauthorizedException('User not found');
            }
            const newBalance = Number(userData.balance) + Number(amount);    
            await queryRunner.manager.update(WalletEntity, { userId: user.id }, { balance: newBalance });    
            await queryRunner.manager.update(UserEntity, { id: user.id }, { balance: newBalance });
                await queryRunner.manager.insert(WalletEntity, {
                amount,
                balance: newBalance,
                type: WalletType.Deposit,
                invoice_number: Date.now().toString(),
                userId: user.id,
            });

            await queryRunner.commitTransaction();
        } catch (error) {
            console.log(error);
            await queryRunner.rollbackTransaction();
        } finally {
            await queryRunner.release();
        }
    
        return {
            message: "Deposit successful",
        };
    }
    
    



}
