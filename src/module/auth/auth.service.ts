import { Inject, Injectable, NotFoundException, Scope, UnauthorizedException } from '@nestjs/common';
import { AuthDto, } from './dto/auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { OtpEntity } from '../user/entities/otp.entity';
import { randomInt } from 'crypto';
import { TokenService } from './token.service';
import { REQUEST } from '@nestjs/core';
import { AuthType } from './enum/type.enum';
import { Request, Response } from 'express';
import { AuthResponseType } from './enum/response.type';
import { CookieKeys } from '@/common/enums/cookie.enum';
import { AuthMessage, publicMessage } from '@/common/enums/message.enum';

@Injectable({ scope: Scope.REQUEST })
export class AuthService {

    constructor(
        @Inject(REQUEST) private request: Request,
        @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
        @InjectRepository(OtpEntity) private otpRepository: Repository<OtpEntity>,
        private tokenService: TokenService
    ) { }


    async ExistUser(authDto: AuthDto, res: Response) {
        const { type, } = authDto
        let result: AuthResponseType
        switch (type) {
            case AuthType.Login: {
                result = await this.login(authDto);
                return this.sendResponse(res, result);
            }
            case AuthType.Register: {
                result = await this.register(authDto);
                return this.sendResponse(res, result);
            }

            default:
                throw new UnauthorizedException()
        }
    }

    async register(authDto: AuthDto,) {
        const { password, mobile, username, } = authDto
        let user = await this.userRepository.findOneBy({ username })
        if (!user) {
            const hashPassword = await bcrypt.hash(password, 12)
            user = this.userRepository.create({
                username,
                mobile,
                password: hashPassword,


            })
            user = await this.userRepository.save(user)
            const otp = await this.createOtpAndSave(user.id)
            const tokenOtp = this.tokenService.createOtpToken({ userId: user.id })
            return {
                tokenOtp,
                code: otp.code,
            }
        }
    }

    async login(authDto: AuthDto,) {
        const { password, username, } = authDto
        let user = await this.userRepository.findOneBy({ username })
        if (!user) throw new NotFoundException()
        const isPasswordMatching = await bcrypt.compare(password, user.password)
        if (!isPasswordMatching) throw new UnauthorizedException()
        const otp = await this.createOtpAndSave(user.id)
        const tokenOtp = this.tokenService.createOtpToken({ userId: user.id })
        return {
            tokenOtp,
            code: otp.code
        }

    }



    async createOtpAndSave(userId: number) {
        const code = randomInt(10000, 99999).toString()
        const ExpiresIn = new Date(new Date().getTime() + 1000 * 60 * 2)
        let existOtp = false
        let otp = await this.otpRepository.findOneBy({ userId })
        if (otp) {
            existOtp = true
            otp.code = code
            otp.ExpiresIn = ExpiresIn
            otp = await this.otpRepository.save(otp);
        } else {
            otp = await this.otpRepository.create({
                code,
                ExpiresIn,
                userId,
            })
            otp = await this.otpRepository.save(otp)
        }
        if (!existOtp) {
            await this.userRepository.update({ id: userId }, { otpId: otp.id });
        }

        return otp;


    }
    async checkOtp(code: string) {
        const token = this.request.cookies?.[CookieKeys.OTP];
        if (!token) throw new UnauthorizedException(AuthMessage.loginAgain);
        const { userId } = this.tokenService.verifyOtpToken(token)
        const otp = await this.otpRepository.findOneBy({ userId })
        if (!otp) throw new UnauthorizedException(AuthMessage.TryAgain)
        const now = new Date()
        if (otp.ExpiresIn < now) throw new UnauthorizedException(AuthMessage.ExpiredCode)
        if (otp.code !== code) throw new UnauthorizedException(AuthMessage.TryAgain)
        return {
            message:publicMessage.loggedIn
}
    }



    sendResponse(res: Response, result: AuthResponseType) {
        const { code, tokenOtp } = result
        res.cookie(CookieKeys.OTP, tokenOtp, { httpOnly: true, expires: new Date(Date.now() + (1000 * 60 * 2)) });

        res.json({
            tokenOtp,
            code,
            message: publicMessage.SendOtp

        })
    }



}
