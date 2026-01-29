import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  excludePassword<T extends User>(user: T): Omit<T, 'password'> {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword as Omit<T, 'password'>;
  }
}
