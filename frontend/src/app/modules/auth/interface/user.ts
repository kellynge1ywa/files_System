export interface AppUser {
  id: string;
  fullname: string;
  email: string;
  password: string;
}
export interface ProfileUser {
  uid: string;
  fullname?: string;
  displayName?: string;
  email?: string;
  photoURL?: string;
  phoneNumber?: string;
  residence?: string;
  dob?: string;
}

export interface NewUser {
  email: string;
  password: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface ResetPassword {
  email: string;
}
