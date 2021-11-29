import { Trim } from "src/trim/trim.entity";
import { User } from "src/user/user.entity";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('TIRE')
export class Tire{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tireName: string;

  @Column()
  width: number;

  @Column()
  ratio: string;

  @Column()
  wheelsize: number;

  @Column({nullable:true})
  unit: string;

  @Column({nullable:true})
  multiValues: string;

  @ManyToOne(() => Trim, trim => trim.tires, { eager: true })
  trim: Trim
}