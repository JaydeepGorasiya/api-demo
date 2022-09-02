import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppDataSource } from '../dataSource';
import { User } from '../entity/user.entity';

@Injectable()
export class AddressService {

    constructor(
        @InjectRepository(User)
        private userRepository = AppDataSource.getRepository(User),
    ){}    

    async findOne(id) {
        return this.userRepository.findOneBy({id: id});
    }

    async store(req, data){
        const user = await this.findOne(req.user.userId)
        user.address = JSON.stringify(data)
        return this.userRepository.save(user)
        // console.log(JSON.stringify(data)) 
    
    }

    async view(req, data){
        const user = await this.findOne(req.user.userId)
    }

    async update(req, data){
        const user = await this.findOne(req.user.userId)
        var address = JSON.parse(user.address)
        
        address.address1 = data.address1      
        address.address2 = data.address2      
        address.country = data.country      
        address.state = data.state      
        address.city = data.city      
        address.pincode = data.pincode      

        user.address = JSON.stringify(address)
        return this.userRepository.save(user)
    }

    async delete(req, data){
        const user = await this.findOne(req.user.userId)
        user.address = ''
        return this.userRepository.save(user)
    }
    
}
