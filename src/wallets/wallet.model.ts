import { Column, Model, Table, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { IsNotEmpty, IsNumberString, IsInt, IsString } from 'class-validator';
import { User } from '../users/user.model';

@Table
export class Wallet extends Model<Wallet> {
  @Column({ allowNull: false, unique: true })
  cardNumber: string;

  @Column({ allowNull: false, defaultValue: 0.0 })
  balance: number;

  @ForeignKey(() => User)
  @Column({ allowNull: false, unique: true })
  userId: number;

  @BelongsTo(() => User)
  owner: User;
}

export class NewWalletDto {
  @IsNotEmpty()
  @IsString()
  cardNumber: string;

  @IsNumberString()
  balance: number;

  @IsInt()
  userId: number;
}
