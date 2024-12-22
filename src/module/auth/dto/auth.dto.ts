import { ApiProperty } from "@nestjs/swagger";
import { AuthType } from "../enum/type.enum";

export class AuthDto {
    @ApiProperty()
    username: string
    @ApiProperty()
    password: string
    @ApiProperty()
    mobile: string
    @ApiProperty({ enum: AuthType })
    type: AuthType

}

export class LogInDto {
    @ApiProperty()
    username: string
    @ApiProperty()
    password: number

}


export class CheckOtpDto {
    @ApiProperty() code: string;
}
