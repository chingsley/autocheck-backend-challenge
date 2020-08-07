import { Column, Model, Table, HasOne } from 'sequelize-typescript';
import { Sale } from '../sales/sale.model';
import {
  IsNotEmpty,
  IsNumberString,
  IsString,
  IsLatLong,
  Length,
  IsOptional,
} from 'class-validator';

@Table
export class Car extends Model<Car> {
  @Column({ allowNull: false })
  make: string;

  @Column({ allowNull: false })
  model: string;

  @Column({ allowNull: false })
  features: string;

  @Column({ allowNull: false, unique: true })
  vin: string;

  @Column({ allowNull: false })
  price: number;

  @Column({ allowNull: false })
  location: string;

  @HasOne(() => Sale)
  sold: Sale;
}

export class NewCarDto {
  @IsNotEmpty()
  @IsString()
  make: string;

  @IsNotEmpty()
  @IsString()
  model: string;

  @IsNotEmpty()
  features: string;

  @IsNotEmpty()
  @Length(17, 17, {
    message: 'vin must be 17 characters in length',
  })
  vin: string;

  @IsNumberString()
  price: number;

  @IsLatLong()
  location: string;
}

export class carUpdateDto {
  @IsOptional()
  @IsString()
  make: string;

  @IsOptional()
  @IsString()
  model: string;

  @IsOptional()
  features: string;

  @IsOptional()
  @Length(17, 17, {
    message: 'vin must be 17 characters in length',
  })
  vin: string;

  @IsOptional()
  @IsNumberString()
  price: number;

  @IsOptional()
  @IsLatLong()
  location: string;
}
