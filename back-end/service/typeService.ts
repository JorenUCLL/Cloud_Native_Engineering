import typeDb from '../repository/type.db';

const getAllTypes = async () => typeDb.getAllTypes();

export default {
    getAllTypes,
};
