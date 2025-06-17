import TypeModel, { IType } from "../mongo-models/Type";

export class MongoTypeRepository {
  private static instance: MongoTypeRepository;

  static getInstance(): MongoTypeRepository {
    if (!this.instance) {
      this.instance = new MongoTypeRepository();
    }
    return this.instance;
  }

  private constructor() {}

  async getAllTypes(): Promise<IType[]> {
    return await TypeModel.find();
  }

  async getTypeById(title: string): Promise<IType | null> {
    return await TypeModel.findOne({ title });
  }

  async createType(data: Partial<IType>): Promise<IType> {
    const type = new TypeModel(data);
    return await type.save();
  }
}
