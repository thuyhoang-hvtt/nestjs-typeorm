import { Entity, PrimaryGeneratedColumn, PrimaryColumn, Column } from "typeorm";
import { InitEntity } from "src/shared/shared.entities";

export enum UserRole {
  Admin = 'Admin',
  User = 'User'
};

@Entity() 
export class User extends InitEntity {
  @PrimaryColumn({
    type: 'text'
  })
  username: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.User
  })
  role: UserRole;

  @Column({
    type: 'text',
    nullable: true
  })
  firstName?: string;

  @Column({
    type: 'text',
    nullable: true
  })
  lastName?: string;
}