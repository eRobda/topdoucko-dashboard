import { RowDataPacket, ResultSetHeader } from 'mysql2';

declare module 'mysql2' {
  export interface RowDataPacket {
    [key: string]: any;
  }
}

export type QueryResult<T> = [T[], RowDataPacket[]];
export type InsertResult = [ResultSetHeader, RowDataPacket[]];

export interface TypedRowDataPacket extends RowDataPacket {
  [key: string]: any;
} 