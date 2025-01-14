import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Hospital } from './hospital/entities/hospital.entity';
import { Patient } from './hospital/entities/patient.entity';
import { Room } from './hospital/entities/room.entity';
import { Ward } from './hospital/entities/ward.entity';
import { Post } from './post/entities/post.entity';
import { User } from './user/entities/user.entity';
import { HospitalModule } from './hospital/hospital.module';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';
import { ReservationModule } from './reservation/reservation.module';
import { Reservation } from './reservation/entities/reservation.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory() {
        return {
          type: 'mysql',
          host: process.env.MYSQLDB_HOST,
          port: parseInt(process.env.MYSQLDB_DOCKER_PORT, 10),
          username: process.env.MYSQLDB_USER,
          password: process.env.MYSQLDB_PASSWORD,
          database: process.env.MYSQLDB_DATABASE,
          entities: [User, Post, Room, Ward, Patient, Hospital, Reservation],
          synchronize: true, // Fix me : set this value to false when deploy
        };
      },
    }),
    ConfigModule.forRoot(),
    HospitalModule,
    AuthModule,
    PostModule,
    ReservationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
