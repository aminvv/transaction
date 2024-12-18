import { BaseEntityCustom } from "@/common/abstract/baseEntityCustom.entity";
import { EntityName } from "@/common/enums/entity.enum";
import { WalletEntity } from "@/module/wallet/entities/wallet.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity(EntityName.User)
export class UserEntity extends BaseEntityCustom{
 @Column()
 fullname:string
 @Column()   
 mobile:string
 @Column({type:"numeric" ,default:0})   
 balance:number
 @Column()   
 create_at:Date
 @OneToMany(()=>WalletEntity,wallet=>wallet.user)
 transaction:WalletEntity[]
}