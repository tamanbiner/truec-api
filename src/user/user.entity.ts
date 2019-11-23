import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';
import { IsEmail } from 'class-validator';
import * as crypto from 'crypto';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  @IsEmail()
  email: string;

  @Column({ nullable: false })
  password: string;

  @BeforeInsert()
  hashPassword(): void {
    this.password = crypto.createHmac('sha256', this.password).digest('hex');
  }

  @Column({ nullable: false })
  fullName: string;
}
