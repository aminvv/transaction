import { BaseEntityCustom } from "@/common/abstract/baseEntityCustom.entity";
import { EntityName } from "@/common/enums/entity.enum";
import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne } from "typeorm";
import { WalletType } from "../enum/walletType.enum";
import { UserEntity } from "@/module/user/entities/user.entity";

@Entity(EntityName.Wallet)
export class WalletEntity extends BaseEntityCustom{
    @Column()
    userId:number
    @Column({type:"enum",enum:WalletType,nullable:true})
    type:string
    @Column({nullable:true})
    invoice_number:string
    @Column({type:"numeric",default:0})
    amount: number
    @Column({type:"numeric",default:0})
    balance:number
    @CreateDateColumn()
    create_at:Date
    @ManyToOne(()=>UserEntity,user=>user.transaction,{onDelete:"SET NULL"})
    users:UserEntity
}