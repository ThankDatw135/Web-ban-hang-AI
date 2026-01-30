import { applyDecorators, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { RolesGuard } from "../guards/roles.guard";
import { Roles } from "./roles.decorator";
import { Role } from "@prisma/client";

export function Auth(...roles: Role[]) {
  return applyDecorators(
    UseGuards(AuthGuard("jwt"), RolesGuard),
    Roles(...roles),
    ApiBearerAuth("JWT-auth"),
    ApiUnauthorizedResponse({ description: "Unauthorized" }),
  );
}

export function AuthAdmin() {
  return Auth(Role.ADMIN);
}
