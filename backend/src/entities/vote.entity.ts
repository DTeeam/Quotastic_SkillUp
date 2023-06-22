import { Base } from './base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Quote } from './quote.entity';
import { User } from './user.entity';

@Entity()
export class Vote extends Base {
  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Quote)
  @JoinColumn({ name: 'quote_id' })
  quote: Quote;

  @Column({ nullable: true })
  decision: number;
}
