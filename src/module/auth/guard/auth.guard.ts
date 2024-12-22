import { AuthMessage } from "@/common/enums/message.enum";
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { isJWT } from "class-validator";
import { Request } from "express";
import { AuthService } from "../auth.service";

@Injectable()
 export class AUthGuard implements CanActivate{
    constructor(private authService:AuthService){}
    async canActivate(context: ExecutionContext) {
        const request=context.switchToHttp().getRequest<Request>()
        const token =this.ExtractToken(request)
        request.user=await this.authService.validationAccessToken(token)
        return true
     }

      protected ExtractToken (request:Request){
        const {authorization}=request.headers
        if(!authorization || authorization.trim()==""){
            throw new UnauthorizedException(AuthMessage.loginAgain)
        }
        const [bearer,token]=authorization.split(" ")
        if(bearer?.toLowerCase()!== "bearer" || !token ||!isJWT(token) ){
            throw new UnauthorizedException(AuthMessage.loginRequired)
        }
        return token
      }
}

 


