import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  login() {
    return { msg: 'hello' };
  }

  async signUp(dto: AuthDto) {
    //generate password hash
    const hash = await argon.hash(dto.password);
    //save the new user in the db
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        hash,
      },
    });
    // remove hash from the return (security) using transformers
    delete user.hash;
    // if you want to specify the return fields try out:
    /**
     * select: {
     *  id: true,
     *  email: true,
     *  createdAt: true,
     * ...};
     */
    // return saved user
    return user;
    return 'I am signed up';
  }
}
