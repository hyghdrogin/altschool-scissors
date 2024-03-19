export interface IUser {
    _id?: string
    email: string
    password: string
    createdAt?: Date
    updatedAt?: Date
  }
  
export interface PayloadInterface {
    id: string
    email: string
  }
  
export interface signUpInterface {
    email: string;
    username: string;
    password: string;
}

export interface signInInterface {
    emailUsername: string;
    password: string;
}

  