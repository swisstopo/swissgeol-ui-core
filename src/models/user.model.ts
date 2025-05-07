import { Id } from './base/id';

export interface SimpleUser {
  id: Id<SimpleUser>;
  firstName: string;
  lastName: string;
}
