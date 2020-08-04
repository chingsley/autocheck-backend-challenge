import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { NewUserDto } from './user.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async create(payload: NewUserDto): Promise<User> {
    let user = await this.findUserByEmail(payload.email);
    if (user) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: `a user with email ${payload.email} already exists`,
        },
        HttpStatus.CONFLICT,
      );
    }
    user = new this.userModel(payload);
    await user.save();
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  findById(id: number): Promise<User> {
    return this.userModel.findOne({
      where: {
        id,
      },
    });
  }

  async remove(id: number): Promise<void> {
    const user = await this.findById(id);
    await user.destroy();
  }

  private async findUserByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ where: { email } });
    return user;
  }
}
