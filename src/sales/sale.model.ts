import { Column, Model, Table, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { IsNotEmpty, IsInt, IsOptional, IsNumberString } from 'class-validator';
import { User } from '../users/user.model';
import { Car } from '../cars/car.model';

@Table
export class Sale extends Model<Sale> {
  @ForeignKey(() => Car)
  @Column({ allowNull: false, unique: true })
  carId: number;

  @ForeignKey(() => User)
  @Column({ allowNull: false })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Car)
  car: Car;
}

export class NewSaleDto {
  @IsNotEmpty()
  @IsInt()
  carId: number;
}
