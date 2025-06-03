export interface UserAddress {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: {
    lat: string;
    lng: string;
  };
}

export interface UserLogin {
  uuid: string;
  username: string;
  password: string;
  md5: string;
  sha1: string;
  registered: string;
}

export interface UserCompany {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  birthDate: string;
  login: UserLogin;
  address: UserAddress;
  phone: string;
  website: string;
  company: UserCompany;
}

export interface UserListItem {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  company: string;
} 