import { Test, TestingModule } from "@nestjs/testing";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { describe, beforeEach, it, expect } from "vitest";
import { UsersModule } from "src/users/users.module";
import { users } from "src/common/fakeDB/users.const";

describe("AuthController", () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("should be return a passwordless user upon a login request", () => {
    const user = users[0];
    const { password: _, ...userWithoutThePassword } = user;
    expect(controller.signIn(user)).toStrictEqual(userWithoutThePassword);
  });
});
