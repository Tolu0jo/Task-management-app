import { BaseEntity,Column,Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";


@Entity()
export class Task extends BaseEntity {
@PrimaryGeneratedColumn("uuid")
id:string;

@Column()
title:string;

@Column()
description:string;

@Column()
status:string

@ManyToOne(type => User, user => user.tasks,{eager:false})
user:User
}
