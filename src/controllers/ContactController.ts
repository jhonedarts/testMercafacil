import { Request, Response } from "express"
import { getCustomRepository } from "typeorm"
import { ContactRepository } from "../repositories/ContactRepository"
import { ContactFormatted } from "../models/ContactFormatted"
import * as yup from 'yup'
import { AppError } from "../errors/AppError"
import { DB_NAME } from "../database"

class ContactController {
    async create(request: Request, response: Response) {
        const { contacts } = request.body

        const schema = yup.object().shape({
            contacts: yup.array().required(),
        })

        try {
            for await (const contact of contacts) {
                schema.validate(contact, { abortEarly: false })
            }
        } catch (error) {
            throw new AppError(error)
        }

        for (const contact of contacts) {
            const db = true ? DB_NAME.MACAPA: DB_NAME.VAREJAO
            const contactFormatted = new ContactFormatted(contact.name, contact.cellphone, db)
            const nome = contactFormatted.nome
            const celular = contactFormatted.celular

            const contactRepository = getCustomRepository(ContactRepository, db)

            const contactAlreadyExists = await contactRepository.findOne({
                celular
            })

            if (contactAlreadyExists) {
                throw new AppError("Contact already exists!")
            }

            const contactAux = contactRepository.create({
                nome, celular
            })

            await contactRepository.save(contactAux)
        }

        return response.status(201).json(contacts)
    }

}

export { ContactController }
