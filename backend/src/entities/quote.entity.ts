import { Base } from './base.entity';
import { Column, Entity } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Quote extends Base {
  @Column()
  quote: string;

  @Column()
  likes: number;

  @Column()
  user: User;
}
