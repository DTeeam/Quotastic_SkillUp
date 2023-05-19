import { Base } from './base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Quote extends Base {
  @Column()
  quote: string;

  @Column()
  likes: number;

  @Column()
  user: string;

  @Column({ nullable: true })
  image: string;
}
