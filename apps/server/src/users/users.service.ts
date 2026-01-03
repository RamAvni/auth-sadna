import { Injectable } from "@nestjs/common";
import { users } from "src/common/fakeDB/users.const";

// This should be a real class/interface representing a user entity
export interface User {
  userId: number;
  username: string;
  password: string;
}

@Injectable()
export class UsersService {
  private readonly users = users;
  findOne(username: string): User | undefined {
    return this.users.find((user) => user.username === username);
  }
}
