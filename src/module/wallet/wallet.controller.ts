import { Body, Controller, Post } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { swaggerConsumes } from '@/common/enums/swagger-consumes.enum';
import {  DepositDto ,WithdrawDto} from './dto/wallet.dot';
import { AuthDecorator } from '@/common/decoratores/auth.decorator';
@ApiTags("wallet")
@AuthDecorator()
@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) { }



  @Post('/deposit')
  @ApiConsumes(swaggerConsumes.UrlEncoded, swaggerConsumes.Json)
  deposit(@Body() depositDto: DepositDto) {
    return this.walletService.deposit(depositDto) 
  }


  @Post('/withdraw')
  @ApiConsumes(swaggerConsumes.UrlEncoded,swaggerConsumes.Json)
  withdraw(@Body() withdrawDto:WithdrawDto){
    return this.walletService.withdraw(withdrawDto)
  }
}
