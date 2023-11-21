export type postType = {
  _id: string;
  title: string;
  username: string;
  desc: string;
  updatedAt: Date;
  userId: string;
  image: string;
};

export type UserType = {
  username: string;
  userId: string;
  token: string;
  avatar?: string
};

export type ValueType = {
  isLogged: null | UserType;
};

export type PostType = {
  post: postType;
};

export type TComment = {
  _id: string;
  comment: string;
  username: string;
  userId: string;
  updatedAt?: string | number | Date;
};

export type CommentType = {
  data: TComment;
};
