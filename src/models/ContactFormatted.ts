import { DB_NAME } from "../database"

class ContactFormatted {
    nome: string
    celular: string

    constructor(nome: string, celular: string, type: string) {
        switch (type) {
            case DB_NAME.MACAPA:
                this.nome = nome.toUpperCase()
                this.celular = this.phoneMask(celular, true)
                break
            case DB_NAME.VAREJAO:
                this.nome = nome
                this.celular = this.phoneMask(celular, false)
                break
            default:
                break
        }
    }

    private phoneMask (val: string, mask: boolean) {
        let v = val.replace(/\D/g,"")
        if (mask) v = v.replace(/^(\d{2})(\d{2})(\d+)(\d{4})/g,"+$1 ($2) $3-$4")
        return v
    }
}

export { ContactFormatted }