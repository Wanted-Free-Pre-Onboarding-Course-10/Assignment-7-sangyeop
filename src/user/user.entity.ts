import { BeforeInsert, Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
import { Trim } from "src/trim/trim.entity";
import { Tire } from "src/tire/tire.entity";

@Entity('USER')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable:false, unique: true})
  username: string;

  @Column({nullable:false})
  password: string;

  @ManyToOne(() => Trim, trim => trim.users)
  @JoinColumn({name:'ref_trimId'})
  trim: number
  

  @BeforeInsert()
  async createPassword(password: string) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(password || this.password, salt);
  }
}