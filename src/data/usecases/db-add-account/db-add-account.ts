import { AccountModel } from "../../../domain/models/accountModels";
import { Encrypter } from "../protocols/encrypter";
import {
  AddAccount,
  AddAccountModel,
} from "../../../domain/uses-cases/add-account";

export class DbAccountStub implements AddAccount {
  private readonly encrypter: Encrypter;

  constructor(encrypter: Encrypter) {
    this.encrypter = encrypter;
  }

  async add(account: AddAccountModel): Promise<AccountModel> {
    await this.encrypter.encrypt(account.password);

    return new Promise((resolve) => resolve(null));
  }
}
