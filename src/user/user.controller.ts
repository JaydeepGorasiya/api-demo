import { Controller, Body, Post, Get, ValidationPipe, Request, UsePipes, UseGuards, BadRequestException, FileTypeValidator, MaxFileSizeValidator, ParseFilePipe} from '@nestjs/common';
import { UserService } from './user.service';
import { UserValidation } from './Validation/user.validation';
import { UpdateUserValidation } from './Validation/updateUser.validation';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UploadedFile, UseInterceptors } from '@nestjs/common/decorators';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from  'multer';
import { extname } from  'path';
import { AddressService } from './address/address.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService, private addressService:AddressService){}

    //User registration route
    @Post()
    @UsePipes(ValidationPipe) // for user validation
    async add(@Body() data:UserValidation){
        return await this.userService.create(data).catch(e => {
            if (e.code == "ER_DUP_ENTRY") { // Unique email validation
                throw new BadRequestException(
                    'Account with this email already exists.',
                );
            }
        })
    }

    //view user profile
    @UseGuards(JwtAuthGuard) // for user authentication
    @Get('profile')
    getProfile(@Request() request){
        return this.userService.findOne(request.user.username)
    }
    
    //update user profile
    @UseGuards(JwtAuthGuard) // for user authentication
    @UsePipes(ValidationPipe) //for user validation
    @Post('profile')
    //file code start-------
    @UseInterceptors(FileInterceptor('file',
    {
        //store file
        storage: diskStorage({
            destination: './upload', 
            filename: (req, file, cb) => {
            const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
            return cb(null, `${randomName}${extname(file.originalname)}`)
          }
        })
    }
    ))
    update(@Request() request, @Body() data:UpdateUserValidation, @UploadedFile(new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5120000 }), //file size validation
          new FileTypeValidator({ fileType: 'png' }), //file extension validation
        ],
      }),) profile:Express.Multer.File){
    //file code end-------
    console.log(profile)
        return this.userService.update(request.user, data, profile).catch(e =>{
            if(e.code == "ER_DUP_ENTRY") { // Unique email validation
                throw new BadRequestException(
                    'Account with this email already exists.',
                );
            }
        })
    }

    //User Logout
    @UseGuards(JwtAuthGuard) // for user authentication
    @Get("logout")
    logout(@Request() req){
        req.user =null
        return {message: "Logout Successfully"}
    }

    //change password
    @UseGuards(JwtAuthGuard) // for user authentication
    @Post("change-password")
    changePassword(@Request() req, @Body() data:any){
        return this.userService.changePassword(req.user, data)
    }

    //create user address
    @UseGuards(JwtAuthGuard) // for user authentication
    @Post("address")
    createAddress(@Request() req, @Body() data:any){
        return this.addressService.store(req, data)
    }
    
    //view user address
    @UseGuards(JwtAuthGuard) // for user authentication
    @Post("address/view")
    getAddress(@Request() req, @Body() data:any){
        return this.addressService.store(req, data)
    }
    
    //upadte Address
    @UseGuards(JwtAuthGuard) // for user authentication
    @Post("address/update")
    updateAddress(@Request() req, @Body() data:any){
        return this.addressService.update(req, data)
    }
    
    //remove Address
    @UseGuards(JwtAuthGuard) // for user authentication
    @Post("address/remove")
    removeAddress(@Request() req, @Body() data:any){
        return this.addressService.delete(req, data)
    }
    
}
