import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm'

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id:Number;

    @Column()
    name: string

    @Column({unique: true})
    email: string

    @Column({
        type: "enum",
        enum: ["male", "female","other"]        
    })
    gender: string

    @Column()
    file: string

    @Column()
    address: string

    @Column()
    password: string
}