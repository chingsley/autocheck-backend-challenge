import {
  Column,
  Model,
  Table,
  HasMany,
  HasOne,
  BeforeCreate,
  AfterCreate,
} from 'sequelize-typescript';
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
    // console.log('\n\ninstance = ', instance);
    instance.password = await bcrypt.hash(
      instance.password,
      Number(process.env.BCRYPT_SALT_ROUNDS),
    );
  }

  @AfterCreate
  static async createUserWallet(instance: any) {
    // console.log('\n\n instance = ', instance._modelOptions.sequelize.models);
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
