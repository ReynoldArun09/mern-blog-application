export interface IComment {
  _id: string;
  comment: string;
  username: string;
  userId:string
  updatedAt?: string | number | Date;
}
