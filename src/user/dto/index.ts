import { ApiModelProperty, ApiModelPropertyOptional } from "@nestjs/swagger";
import { User } from "../user.entity";

export class CreateUserDTO {
  @ApiModelProperty()
  username: string;
  
  @ApiModelProperty()
  password: string;

  @ApiModelPropertyOptional()
  firstName?: string;

  @ApiModelPropertyOptional()
  lastName?: string;
}

export class UpdateUserDTO {
  @ApiModelPropertyOptional()
  password?: string;

  @ApiModelPropertyOptional()
  firstName?: string;

  @ApiModelPropertyOptional()
  lastName?: string;
}

export class LoginUserDTO {
  @ApiModelProperty()
  username: string;
  
  @ApiModelProperty()
  password: string;
}
