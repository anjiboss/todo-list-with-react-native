import {
  BeforeInsert,
  Column,
  Entity,
  ObjectID,
  ObjectIdColumn,
} from "typeorm";
import { v4 } from "uuid";
@Entity()
export class Todo {
  @BeforeInsert()
  addId() {
    this.id = v4();
  }

  @ObjectIdColumn()
  _id: ObjectID | string;

  @Column()
  id: string;

  @Column()
  name: string;

  @Column()
  status: boolean;
}
