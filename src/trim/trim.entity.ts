import { Tire } from "src/tire/tire.entity";
import { User } from "src/user/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('TRIM')
export class Trim{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  trimId: number;

  @Column()
  trimName: string;

  @OneToMany(() => User, user => user.trim, { eager: true })
  users: User[]

  @OneToMany(() => Tire, tires => tires.trim, { eager: false })
  @JoinColumn({name:'ref_tireId'})
  tires:Tire[]
}