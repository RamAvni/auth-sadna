// These tests serve just as an example, they really don't test much, and they aren't following proper property-based testing

import { Test, TestingModule } from "@nestjs/testing";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { describe, beforeEach, it, expect } from "vitest";
import { UsersModule } from "src/users/users.module";
import { users } from "src/common/fakeDB/users.const";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./constants";

describe("AuthController", () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        UsersModule,
        JwtModule.register({
          global: true,
          secret: jwtConstants.secret,
          signOptions: { expiresIn: "60s" },
        }),
      ],
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("should be return an accessToken upon a login request", async () => {
    const user = users[0];
    expect(await controller.signIn(user)).toHaveProperty("access_token");
    expect((await controller.signIn(user)).access_token).toBeTypeOf("string");
  });
});
