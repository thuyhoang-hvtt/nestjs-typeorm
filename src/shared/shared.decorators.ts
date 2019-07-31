
import { UserRole } from 'src/user/user.entity';
import { ReflectMetadata } from '@nestjs/common';

export const Roles = (...roles: UserRole[]) => ReflectMetadata('roles', roles);