// These tests serve just as an example, they really don't test much, and they aren't following proper property-based testing

import { Test, TestingModule } from "@nestjs/testing";
import { UsersService } from "./users.service";
import { beforeEach, describe, expect, it } from "vitest";

describe("UsersService", () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it("should return an existing user by their username", () => {
    const existingUser = "john";
    expect(service.findOne(existingUser)).toBeDefined();
  });

  it("should not return a user when given a non-existing username", () => {
    const nonExistingUser = "jake";
    expect(service.findOne(nonExistingUser)).toBeUndefined();
  });
});
