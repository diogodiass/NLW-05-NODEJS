import { getCustomRepository, Repository } from "typeorm";
import { User } from "../entities/User";
import {UserRepository} from "../repositories/UsersRepository";

class UsersService {
  private userRepository: Repository<User>;

  constructor(){
    this.userRepository = getCustomRepository(UserRepository);
  }

  async create(email: string){
    const userExistis = await this.userRepository.findOne({email});
    if(userExistis){
      return userExistis;
    }

    const user =  this.userRepository.create({email});
    await this.userRepository.save(user);
    return user;
  
    }
}
export { UsersService };