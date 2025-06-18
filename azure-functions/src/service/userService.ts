import { MongoUserRepository } from "../repository/user.db";
import { AuthenticationResponse, Role, UserInput } from "../types/index";
import * as bcrypt from "bcryptjs";
import { generateJwtToken } from "../util/jwt";

export class UserService {
  private static instance: UserService;
  private userRepository = MongoUserRepository.getInstance();

  static getInstance(): UserService {
    if (!this.instance) {
      this.instance = new UserService();
    }
    return this.instance;
  }

  async getAllUsers() {
    const users = await this.userRepository.getAllUsers();
    return users;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.getUserByEmail(email);
    if (!user) {
      throw new Error("There is no user with that email address.");
    }
    return user;
  }

  async authenticate({ email, password }): Promise<AuthenticationResponse> {
    const newEmail = email.trim().toLowerCase();
    const user = await this.userRepository.getUserByEmail(newEmail);

    if (!user) {
      throw new Error("No user with that email");
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw new Error("Incorrect password.");
    }

    return {
      token: generateJwtToken({ email, role: user.role as Role }),
      email: user.email,
      role: user.role as Role,
    };
  }
}
