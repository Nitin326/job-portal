import { Job } from "src/employer/entities/job.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "../entities/base.entity";

@Entity()
export class Employer extends BaseEntity{

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({type:'varchar'})
    name:string;

    @Column({type:'varchar'})
    companyname:string;

    @Column({type:'varchar'})
    jobrole:string;

    @Column({type:'varchar'})
    email:string;

    @Column({type:'varchar'})
    phone:string;

    @OneToMany(() => Job, job => job.employer)
    jobs:Job[];

}
