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
  fullname: string;
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

export interface RegisterUser {
  fullname: string;
  email: string;
  password: string;
  residence: string;
  mobileNumber: string;
  dOB: string;
  role: string;
}
export interface ResponseDto {
  error: string;
  result: AppUser;
  success: boolean;
}

export interface UserResponseDto {
  token: string;
  userDto: AppUser;
}
