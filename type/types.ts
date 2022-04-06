import { Model, Types } from "mongoose";

export interface TaskDocument {
  content: string;
  state: string;
}

export interface UserDocument {
  email: string;
  password: string;
  token?: string;
  todo: TaskDocument[];
  generateToken(): Promise<string>;
}

type UserDocumentProps = {
  todo: Types.DocumentArray<TaskDocument>;
};

export interface UserModel extends Model<UserDocument, {}, UserDocumentProps> {
  compareCredentials(email: string, password: string): Promise<boolean>;
}
