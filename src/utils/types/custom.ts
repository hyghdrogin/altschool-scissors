import { IUser } from "./user";

export interface CustomRequest {
  user: IUser
  file: object
  params: object
  query: object
  path: object
}