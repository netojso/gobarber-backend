import { Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Generated,
  UpdateDateColumn } from 'typeorm';

@Entity ('user_tokens') // Nome da tabela
class UserToken {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Generated('uuid')
  token: string;

  @Column()
  user_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default UserToken;
