import { Id } from './base/id';

export interface SimpleUser {
  id: Id<this>;
  firstName: string;
  lastName: string;
}
