import { ApiProperty } from "@nestjs/swagger";


export class DepositDto{
    @ApiProperty()
    amount:number

}
export class WithdrawDto{
    @ApiProperty()
    productId:number

}
