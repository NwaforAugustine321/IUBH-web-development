export interface ILogin {
  email: string;
  password: string;
}

export interface IBookMark {
  authors: string[];
  book_name: string;
}

export interface IRemoveBookMark {
  book_name: string;
}
