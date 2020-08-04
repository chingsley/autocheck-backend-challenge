import { Module, NestModule, RequestMethod, MiddlewareConsumer } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { User } from './user.model';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { validateNewUser } from './users.middleware';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  exports: [SequelizeModule],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
// export class UsersModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(validateNewUser).forRoutes({ path: 'users', method: RequestMethod.POST });
//   }
// }
