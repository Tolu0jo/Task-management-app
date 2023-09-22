import { BaseEntity,Column,Entity, PrimaryGeneratedColumn } from "typeorm";
import * as argon from "argon2";
import { Task } from "./task.entity";

@Entity()
export class User extends BaseEntity {
@PrimaryGeneratedColumn("uuid")
id:string;

@Column({unique:true})
username:string;

@Column()
password:string;

@Column({unique:true})
email:string;


tasks

async validatePassword(password:string): Promise<boolean>{
   return await argon.verify(this.password,password)
}
}
