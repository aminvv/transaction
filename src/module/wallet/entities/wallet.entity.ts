import { BaseEntityCustom } from "@/common/abstract/baseEntityCustom.entity";
import { EntityName } from "@/common/enums/entity.enum";
import { Column, CreateDateColumn, Entity, ManyToMany } from "typeorm";
import { WalletType } from "../enum/walletType.enum";
import { UserEntity } from "@/module/user/entities/user.entity";

@Entity(EntityName.Wallet)
export class WalletEntity extends BaseEntityCustom{
    @Column({type:"enum",enum:WalletType})
    type:string
    @Column()
    invoice_number:string
    @CreateDateColumn()
    create_at:Date
    @Column()
    userId:number
    @ManyToMany(()=>UserEntity,user=>user.transaction,{onDelete:"SET NULL"})
    user:UserEntity
}