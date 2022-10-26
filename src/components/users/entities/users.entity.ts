import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { hashSync } from 'bcrypt';

@Entity({ name: 'users' })
export class UsersEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column({ name: 'full_name' })
  fullName: string;
  @Column({ name: 'email', unique: true })
  email: string;

  @Column({ name: 'password' })
  password: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt?: Date;

  @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at' })
  deletedAt?: Date;

  @BeforeInsert()
  encryptPassword() {
    this.password = hashSync(this.password, 10);
  }
}
