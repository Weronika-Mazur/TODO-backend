import { Model, Types } from "mongoose";
import { TaskDocument } from "./task";

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
