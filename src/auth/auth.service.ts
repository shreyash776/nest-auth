import { Injectable } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { User } from './user.interface'; // import interface

@Injectable()
export class AuthService {
  private users: User[] = []; // ✅ now TS knows each user has username, email, etc.

  signup(signupDto: SignupDto) {
    const { username, email, password } = signupDto;

    // check if user exists
    const userExists = this.users.find((u) => u.email === email);
    if (userExists) {
      return { message: 'User already exists' };
    }

    // create token
    const token = Math.random().toString(36).substring(2);

    // push new user
    this.users.push({ username, email, password, token });

    return { message: 'Signup successful', token };
  }

  login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = this.users.find((u) => u.email === email);
    if (!user) {
      return { message: 'User not found' };
    }

    if (user.password !== password) {
      return { message: 'Invalid password' };
    }

    return { message: 'Login successful', token: user.token };
  }

  getAllUsers() {
    // return without password for security
    return this.users.map(({ password, ...rest }) => rest);
  }
}
