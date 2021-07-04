import { EntityRepository, Repository } from "typeorm";
import { Contact } from "../models/Contact";

@EntityRepository(Contact)
class ContactRepository extends Repository<Contact> {

}

export { ContactRepository }