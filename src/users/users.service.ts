import { Injectable, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
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
    await this.detectUniqueViolationOfEmail(payload.email, undefined);
    const user = new this.userModel(payload);
    await user.save();
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  async findOne(id: number): Promise<any> {
    const user = await this.findBy('id', id);
    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `no user matches the ${id}`,
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return user;
  }

  async findBy(parameter: string, value: number | string) {
    const user = await this.userModel.findOne({
      where: { [parameter]: value },
      include: [User.associations.wallet],
    });
    return user;
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);

    await user.destroy();
  }

  private async detectUniqueViolationOfEmail(email: string, id: number): Promise<void> {
    const user = await this.userModel.findOne({ where: { email } });
    if (user && user.id !== id) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: `a user with email ${email} already exists`,
        },
        HttpStatus.CONFLICT,
      );
    }
  }
}
