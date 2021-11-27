import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';

@Entity('USER')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable:false, unique: true})
  username: string;

  @Column({nullable:false})
  password: string;

  @BeforeInsert()
  async createPassword(password: string) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(password || this.password, salt);
  }
}