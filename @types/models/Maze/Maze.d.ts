import User from '../User';
import Info from './Info';
import Structure from './Structure/Structure';

export enum Type {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
}

export default interface Maze {
  id: string;
  owner: User;
  title: string;
  likes: number;
  dislikes: number;
  games: number;
  type: Type;
  info: Info;
  structure: Structure;
  createdAt: Date;
  updatedAt: Date;
}
