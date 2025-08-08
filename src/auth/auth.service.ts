import { Injectable } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  // Temporary in-memory store for users
  private users = [];

  // Handle signup
  signup(signupDto: SignupDto) {
    const { username, email, password } = signupDto;

    // Check if email already exists
    const userExists = this.users.find((u) => u.email === email);
    if (userExists) {
      return { message: 'Email already registered' };
    }

    // Create random token
    const token = Math.random().toString(36).substring(2);

    // Store user in array
    this.users.push({ username, email, password, token });

    return { message: 'User signed up successfully', token };
  }

  // Handle login
  login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Check if email exists
    const user = this.users.find((u) => u.email === email);
    if (!user) {
      return { message: 'Email is incorrect' };
    }

    // Check password
    if (user.password !== password) {
      return { message: 'Password is incorrect' };
    }

    return { message: 'Login successful', token: user.token };
  }
}
