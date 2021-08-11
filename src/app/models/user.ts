export class User {
  id: number;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  profile_photo_path: string = "https://i.pravatar.cc/300";
  roles: { name: string }[] = [];
  constructor(
    email: string,
    password: string,
    first_name: string,
    last_name: string,
    profile_photo_path: string,
    roles: { name: string }[]
  ) {
    this.email = email;
    this.password = password;
    this.first_name = first_name;
    this.last_name = last_name;
    this.roles = roles;
    profile_photo_path = "https://i.pravatar.cc/300";
    this.id = 0;
  }
  get name(): string {
    return this.first_name + " " + this.last_name;
  }
}
