import { AUthGuard } from "@/module/auth/guard/auth.guard";
import { applyDecorators, UseGuards } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";

export function AuthDecorator(){
    return applyDecorators(
        ApiBearerAuth("Authorization"),
        UseGuards(AUthGuard)
    )
}