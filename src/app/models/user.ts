export class User {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  roles: { name: string }[] = [];
  constructor(
    email: string,
    password: string,
    first_name: string,
    last_name: string,
    roles: { name: string }[]
  ) {
    this.email = email;
    this.password = password;
    this.first_name = first_name;
    this.last_name = last_name;
    this.roles = roles;
  }
}
