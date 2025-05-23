import TypeModel, { IType } from '../mongo-models/Type';

const getAllTypes = async (): Promise<IType[]> => {
    return await TypeModel.find();
};

const getTypeById = async (title: string): Promise<IType | null> => {
    return await TypeModel.findOne({ title });
};

const createType = async (data: Partial<IType>): Promise<IType> => {
    const type = new TypeModel(data);
    return await type.save();
};

export default {
    getAllTypes,
    getTypeById,
    createType,
};
