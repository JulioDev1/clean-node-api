import { AddAccountModel } from "../../domain/uses-cases/add-account";
import { AccountModel } from "../../domain/models/accountModels";

export interface AddAccountRepository {
  add(accountData: AddAccountModel): Promise<AccountModel>;
}
