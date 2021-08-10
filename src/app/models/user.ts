export class User {
  email: string;
  password: string;
  name: string;
  roles: { name: string }[] = [];
  constructor(
    email: string,
    password: string,
    name: string,
    roles: { name: string }[]
  ) {
    this.email = email;
    this.password = password;
    this.name = name;
    this.roles = roles;
  }
}
