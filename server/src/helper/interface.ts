import { ObjectId } from "mongoose";

export interface IUserModel {
    _doc: Document;
    username: string;
    password: string;
    email:string;
    ComparePassword: (password:string) => Promise<boolean>
}

export interface IPostModel {
    title: string;
    desc: string;
    comments: ICommentModel[];
    image: string;
    file?: string;
    userId: string;
    username: string;
  }
  
  export interface ICommentModel {
    comment: string;
    postId: ObjectId;
    authorId: ObjectId;
    username: string;
  }