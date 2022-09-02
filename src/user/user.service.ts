import { Injectable, Catch } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppDataSource } from './dataSource';
import { User } from './entity/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository = AppDataSource.getRepository(User),
    ){}    
    async create(data){
        const user = new User();
        user.name = data.name;
        user.email = data.email;
        user.gender = data.gender;
        user.password = await bcrypt.hash(data.password, 9)
        return this.userRepository.save(user)
    }

    async findOne(username: string): Promise<User | undefined> {
        return this.userRepository.findOneBy({email: username});
    }

    async update(user, data, profile){
        const updateUser = await this.userRepository.findOneBy({id: user.userId});
        if(data.name !== null && data.name !== '' && data.name !== undefined)
        updateUser.name = data.name;

        if(data.gender !== null && data.gender !== '' && data.gender !== undefined)
        updateUser.gender = data.gender;    

        if(data.email !== updateUser.email && data.email !== null && data.email !== '' && data.email !== undefined)
        updateUser.email = data.email;
        
        if(profile !== updateUser.email && profile !== null && profile !== '' && profile !== undefined)
        updateUser.file = profile.filename;

        return this.userRepository.save(updateUser)
    }

    async changePassword(user, data){
        const updateUser = await this.userRepository.findOneBy({id: user.userId});
        if (await bcrypt.compare(data.current_password, updateUser.password)){
            updateUser.password = await bcrypt.hash(data.new_password, 9)
            return this.userRepository.save(updateUser)
        }
        else{
            return {message: "Please Enter your valid old password"}
        }
    }
}
