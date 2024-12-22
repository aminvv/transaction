import { EntityName } from "@/common/enums/entity.enum";
import { Column, Entity, OneToOne } from "typeorm";
import { UserEntity } from "./user.entity";
import { BaseEntityCustom } from "@/common/abstract/baseEntityCustom.entity";

@Entity(EntityName.Otp)
export class OtpEntity extends BaseEntityCustom{
    @Column({nullable:true})
    code:string
    @Column()
    userId:number
    @Column()
    ExpiresIn:Date
    @OneToOne(()=>UserEntity,user=>user.otp,{onDelete:"CASCADE"})
    user:UserEntity
}