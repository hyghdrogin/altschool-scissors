import { IUser } from "./user";

export interface GeneralRequest {
  user: IUser
  file: object
  params: object
  query: object
  path: object
}