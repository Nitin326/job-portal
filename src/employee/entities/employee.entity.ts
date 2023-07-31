import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Education } from "./eduction.entity";
import { WorkExperience } from "./workexperience.entity";
import { Projects } from "./projects.entity";


@Entity()
export class Employee {

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({type:'varchar'})
    name:string;

    @Column({type:'varchar'})
    role:string;

    @Column({type:'varchar'})
    email:string;

    @Column({type:'varchar'})
    password:string;

    @Column({type:'varchar'})
    phone:string;

    @OneToMany(() => Education, education => education.employee, { cascade: true })
    education:Education[];

    @OneToMany(() => WorkExperience , workexperience => workexperience.employee, { cascade: true })
    workExperience:WorkExperience[];

    @OneToMany(() => Projects, projects => projects.employee)
    projects:Projects[];

    @Column({type:'varchar'})
    location:string;

    @Column({type:'varchar'})
    craetedAt: Date;

    @Column({type:'varchar'})
    updatedAt: Date;

    @Column({type:'varchar'})
    deletedAt: Date;

}
