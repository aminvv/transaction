import { BaseEntityCustom } from "@/common/abstract/baseEntityCustom.entity";
import { EntityName } from "@/common/enums/entity.enum";
import { WalletEntity } from "@/module/wallet/entities/wallet.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { OtpEntity } from "./otp.entity";

@Entity(EntityName.User)
export class UserEntity extends BaseEntityCustom {
    @Column()
    username: string
    @Column()
    password: string;
    @Column({nullable:true})
    fullname: string
    @Column()
    mobile: string
    @Column({ type: "numeric", default:0})
    balance: number
    @CreateDateColumn()
    create_at: Date
    @Column({ nullable: true })
    otpId:number
    @Column({ nullable: true })
    walletId:number
    @OneToMany(() => WalletEntity, wallet => wallet.users)
    transaction: WalletEntity[]
    @OneToOne(()=>OtpEntity,otp=>otp.user, { nullable: true })
    @JoinColumn({name:"otpId"})
    otp:OtpEntity 
} 