import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { CookiePayload } from "../user/dto/payload";
import { AuthMessage } from "@/common/enums/message.enum";

@Injectable()
export class TokenService {
    constructor(private jwtService: JwtService) { }







    //----------OTP TOKEN-----------
    createOtpToken(payload: CookiePayload) {
        const tokenOtp = this.jwtService.sign(payload, {
            secret: process.env.OTP_TOKEN_SECRET,
            expiresIn:  60 * 2
        })

        return tokenOtp
    }
 
    verifyOtpToken(tokenOtp: string): CookiePayload {
        try {
            return this.jwtService.verify(tokenOtp, { 
                secret: process.env.OTP_TOKEN_SECRET });
        }
         catch(error) { 
        throw new UnauthorizedException(AuthMessage.TryAgain)
    }
}

} 