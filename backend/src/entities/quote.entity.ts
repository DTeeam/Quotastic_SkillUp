import { Base } from './base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { IsUUID } from 'class-validator';

@Entity()
export class Quote extends Base {
  @Column()
  quote: string;

  @Column({ nullable: true, default: 0 })
  votes: number;

  @IsUUID()
  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
