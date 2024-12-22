import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { swaggerConsumes } from '@/common/enums/swagger-consumes.enum';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthDto, CheckOtpDto, } from './dto/auth.dto';
import { Request, Response } from 'express';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('/userExistence')
  @ApiConsumes(swaggerConsumes.UrlEncoded, swaggerConsumes.Json)
  userExistence(@Body() authDto: AuthDto,@Res() res: Response) {
    return this.authService.ExistUser(authDto,res)
  }

  @Post('/checkOtp')
  @ApiConsumes(swaggerConsumes.UrlEncoded,swaggerConsumes.Json )
  checkOtp(@Body() checkOtpDto: CheckOtpDto) {
    return this.authService.checkOtp(checkOtpDto.code)
  }
}

