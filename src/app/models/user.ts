export class User {
  email: string;
  password: string;
  name: string;
  constructor(email: string, password: string, name: string) {
    this.email = email;
    this.password = password;
    this.name = name;
  }
}
