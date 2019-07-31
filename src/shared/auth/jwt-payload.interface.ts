import { UserRole } from "src/user/user.entity";

export interface JwtPayload {
  username: string;
  role: UserRole;
  iat?: Date;
}