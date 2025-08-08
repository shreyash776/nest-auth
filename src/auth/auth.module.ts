import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

// Groups controller and service for authentication
@Module({
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
