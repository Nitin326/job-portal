import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Signup {

    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    role: string

    @Column()
    password: string
    
}
