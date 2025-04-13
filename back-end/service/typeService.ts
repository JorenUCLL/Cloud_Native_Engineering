import typeDb from '../repository/type.db';
import { Type } from '../model/type';

const getAllTypes = async (): Promise<Type[]> => typeDb.getAllTypes();

export default {
    getAllTypes,
};
