import { NotFoundException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { Tire } from "./tire.entity";

@EntityRepository(Tire)
export class TireRepository extends Repository<Tire>{
  
  // async findByName(username: string): Promise<Tire[]>{
  //   const found = await this.find({ where: { users: username } });
    
  //   if (!found) throw new NotFoundException(`tire not found with ${username}`);

  //   return found
  // }
}