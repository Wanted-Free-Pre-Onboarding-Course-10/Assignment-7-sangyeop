import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('TRIM')
export class Trim{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  trimId: number;

  @Column()
  trimName: string;
}