import { Id } from './base/id';

export enum Role {
  Reader = 'Reader',
  Editor = 'Editor',
  Reviewer = 'Reviewer',
  Publisher = 'Publisher',
}

export function getRoleIndex(role: Role): number {
  switch (role) {
    case Role.Reader:
      return 0;
    case Role.Editor:
      return 1;
    case Role.Reviewer:
      return 2;
    case Role.Publisher:
      return 3;
  }
}

export interface SimpleUser {
  id: Id<SimpleUser>;
  firstName: string;
  lastName: string;
  role: Role;
}

export type SwissgeolItem = 'Asset' | 'Borehole';
