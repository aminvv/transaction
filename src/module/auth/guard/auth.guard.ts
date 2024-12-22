import { AuthMessage } from "@/common/enums/message.enum";
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { isJWT } from "class-validator";
import { Request } from "express";

@Injectable()
 export class AUthGuard implements CanActivate{
    async canActivate(context: ExecutionContext) {
        const request=context.switchToHttp().getRequest<Request>()
        const token =this.ExtractToken(request)
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

 


