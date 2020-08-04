import { Column, Model, Table, HasMany, HasOne, BeforeCreate } from 'sequelize-typescript';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { Wallet } from '../wallets/wallet.model';
import * as bcrypt from 'bcrypt';

@Table
export class User extends Model<User> {
  @Column({ allowNull: false })
  firstName: string;

  @Column({ allowNull: false })
  lastName: string;

  @Column({ allowNull: false, unique: true })
  email: string;

  @Column({ allowNull: false })
  password: string;

  @HasOne(() => Wallet)
  wallet: Wallet;

  @BeforeCreate
  static async hashPassword(instance: User) {
    instance.password = await bcrypt.hash(instance.password, 12);
  }
}

export class NewUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 20, {
    message: 'firstName must be greater than 1 character but less than 20',
  })
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, 20, {
    message: 'lastName must be greater than 1 character but less than 20',
  })
  lastName: string;

  @IsEmail()
  @IsString()
  email: string;

  @IsNotEmpty()
  @Length(6, 1000, {
    message: 'password must be a minimum of 6 characters',
  })
  password: string;
}
