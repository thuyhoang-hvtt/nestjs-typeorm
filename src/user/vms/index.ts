import { User } from "../user.entity";

export class LoginResponseVM {
  token: string;
  user: User;
}