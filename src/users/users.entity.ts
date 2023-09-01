/* eslint-disable prettier/prettier */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@Unique(['username', 'phoneNumber', 'email'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, type: 'varchar' })
  username: string;

  @Column({ nullable: false, type: 'varchar' })
  firstName: string;

  @Column({ nullable: false, type: 'varchar' })
  middleName: string;

  @Column({ nullable: false, type: 'varchar' })
  lastName: string;

  @Column({ nullable: false, type: 'varchar' })
  phoneNumber: string;

  @Column({ nullable: false, type: 'varchar' })
  email: string;

  @Column({ nullable: false, type: 'varchar' })
  password: string;

  @Column()
  dateOfBirth: Date;

  @Column()
  gender: string;

  @CreateDateColumn({ type: 'timestamp' })
  dateCreated: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  dateUpdated: Date;
}
