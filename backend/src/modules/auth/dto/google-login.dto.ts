import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class GoogleLoginDto {
  @ApiProperty({
    example: "eyJhbGciOiJSUzI1NiIsImtpZCI6IjZm...",
    description: "Firebase ID Token from Client SDK",
  })
  @IsNotEmpty()
  @IsString()
  token: string;
}
