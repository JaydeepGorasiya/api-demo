import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {}

    async validateUser(email: string, pass: string): Promise<any> {
      const user = await this.userService.findOne(email);
      if (user && await bcrypt.compare(pass, user.password)) {
        const { password, ...result } = user;
        return result;
      }
      return null;
    }

    async login(user: any) {
      const authUser = await this.validateUser(user.email, user.password)
        const payload = { email: authUser.email, id: authUser.id };
        return {
          access_token: this.jwtService.sign(payload),
        };
    }
}
