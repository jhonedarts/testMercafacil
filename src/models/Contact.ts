import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid';

@Entity("contacts")
class Contact {
    @PrimaryColumn()
    readonly id: string

    @Column()
    nome: string

    @Column()
    celular: string

    @CreateDateColumn()
    created_at: Date

    constructor() {
        if (!this.id) {
            this.id = uuid()
        }
    }
}

export { Contact }