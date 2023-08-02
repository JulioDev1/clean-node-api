import { Collection, MongoClient } from "mongodb";
export const MongoHelper = {
  client: MongoClient,

  async connect(uri: string): Promise<void> {
    const MongoDB = process.env.MONGO_URL;

    if (!MongoDB) {
      throw new Error("enviroment ambient is not defined");
    }

    this.client = await MongoClient.connect(MongoDB);
  },
  async disconnect(): Promise<void> {
    await this.client.close();
  },

  getCollection(name: string): Collection {
    return this.client.db().collection(name);
  },
};
