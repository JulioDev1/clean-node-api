import { AddAccountRepository } from "../../../../data/protocols/add-account-repository";
import { AccountModel } from "../../../../domain/models/accountModels";
import { AddAccountModel } from "../../../../domain/uses-cases/add-account";
import { MongoHelper } from "../helper/mongo-helper";

export class AccountMongoRepository implements AddAccountRepository {
  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection("accounts");
    const result = await accountCollection.insertOne(accountData);
    const account = result.acknowledged[0];
    const { _id, ...accountWithoutId } = account;
    return Object.assign({}, accountWithoutId, { id: _id });
  }
}
