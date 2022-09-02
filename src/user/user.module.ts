import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm' 
import { AddressService } from './address/address.service';
import { User } from './entity/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
    imports:[TypeOrmModule.forFeature([User])],
    exports:[TypeOrmModule, UserService],
    controllers:[UserController],
    providers:[UserService, AddressService]
})
export class UserModule {}
