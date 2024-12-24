import { ApiProperty } from "@nestjs/swagger";

export class DepositDto{
    @ApiProperty()
    amount:number

}