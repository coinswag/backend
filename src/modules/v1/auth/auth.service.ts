import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/user.dto';
import { User, UserDocument } from '../user/user.schema';
import { LoginDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(payload: CreateUserDto): Promise<User> {
    return await this.userService.createUser(payload);
  }

  async login(payload: LoginDto) {
    const { did } = payload;

    let user = await this.userService.getUserByDid(did);

    if (!user) {
      if (payload.isNewUser === true && payload.pubKey) {
        user = await this.register({ did, pubKey: payload.pubKey }) as UserDocument;
      } else {
        throw new BadRequestException('Invalid Credentials for Login');
      }
    }

    const token = this.jwtService.sign({ id: user._id }, { expiresIn: '7d' });
    return {
      user,
      accessToken: token,
    };
  }
}
