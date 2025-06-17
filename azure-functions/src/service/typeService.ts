import { MongoTypeRepository } from "../repository/type.db";

export class TypeService {
  private static instance: TypeService;

  private typeRepo = MongoTypeRepository.getInstance();

  static getInstance(): TypeService {
    if (!this.instance) {
      this.instance = new TypeService();
    }
    return this.instance;
  }

  async getAllTypes() {
    return await this.typeRepo.getAllTypes();
  }
}
