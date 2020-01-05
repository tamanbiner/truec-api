import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';
import { IsEmail } from 'class-validator';
import { IUser } from './user.interface';

@Entity('user')
@Unique('unique_user_email', ['email'])
export class UserEntity implements IUser {
  @PrimaryGeneratedColumn('uuid')
  uid: string;

  @Column({ nullable: false, unique: true })
  @IsEmail()
  email: string;

  @Column({ nullable: false, default: 'NULL' })
  passwordHash: string;

  @Column({ nullable: false })
  fullName: string;
}
