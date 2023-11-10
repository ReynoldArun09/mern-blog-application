export interface IUserModel {
    _doc: Document;
    username: string;
    password: string;
    email:string;
    ComparePassword: (password:string) => Promise<boolean>
}
