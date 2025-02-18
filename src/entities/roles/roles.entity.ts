import { ACTIVE_DELETED_ENUM } from '@entities/enums/isDeleted.enum';
import { User } from '@entities/users/user.entity';
import { Column, Entity, PrimaryGeneratedColumn, Unique, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToMany } from 'typeorm';

@Entity('roles', { orderBy: { id: 'DESC' } })
export class RoleEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ nullable: false })
  @Unique(['role'])
  role: string;

  @Column({ type: 'enum', enum: ACTIVE_DELETED_ENUM, default: ACTIVE_DELETED_ENUM.ACTIVE })
  isDeleted: ACTIVE_DELETED_ENUM;

  @ManyToMany(() => User, (user) => user.roles)
  users: User[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  toJSON() {
    delete this.isDeleted;
    return this;
  }

}