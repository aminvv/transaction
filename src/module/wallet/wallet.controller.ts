import { Controller } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { ApiTags } from '@nestjs/swagger';
@ApiTags("wallet")
@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}
}
