import { Entity,
        PrimaryGeneratedColumn,
        Column,
        CreateDateColumn,
        UpdateDateColumn,
        ManyToOne,
        JoinColumn} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/Users'

@Entity ('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  barber_id: string;

  @ManyToOne(()=> User)
  @JoinColumn({name : 'barber_id'})
  barber: User;

  @Column('timestamp with time zone')
  date: Date

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Appointment;
