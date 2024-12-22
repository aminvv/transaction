import { OtpEntity } from "@/module/user/entities/otp.entity";
import { UserEntity } from "@/module/user/entities/user.entity";
import { WalletEntity } from "@/module/wallet/entities/wallet.entity";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { join } from "path";


export function TypeOrmConfig():TypeOrmModuleOptions{
    const{DB_DATABASE,DB_HOST,DB_PASSWORD,DB_PORT,DB_USERNAME}=process.env
    return{
        type:"postgres",
        host:DB_HOST,
        port:parseInt(DB_PORT),
        database:DB_DATABASE,
        username:DB_USERNAME,
        password:DB_PASSWORD,
        autoLoadEntities:false,
        // entities:[join(__dirname,"../module/**/entities/*.entity{.ts,.js}")],
        entities:[OtpEntity,UserEntity,WalletEntity],
        synchronize:true

    }
}
      