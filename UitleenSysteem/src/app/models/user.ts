export interface Roles {
  student?: boolean;
  docent?: boolean;
  beheerder?: boolean;
}

export class User {
  uid: string;
  email: string;
  naam:  string;
  studentnummer: number;
  roles:  Roles;

  klas?: string;

  constructor(authData) {
    this.naam = authData.naam;
    this.email = authData.email;
    this.roles = authData.roles;
  }
}
