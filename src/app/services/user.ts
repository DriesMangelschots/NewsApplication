export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  photoURL: string;
}
export class User implements IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  photoURL: string;

  constructor(user: IUser) {
      Object.assign(this, user);
  }
}

