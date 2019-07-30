import { ApiModelProperty, ApiModelPropertyOptional } from "@nestjs/swagger";

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

export class LoginUserDTO {
  @ApiModelProperty()
  username: string;
  
  @ApiModelProperty()
  password: string;
}