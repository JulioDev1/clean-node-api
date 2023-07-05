export class MissingParamError extends Error {
  constructor(paramName: string) {
    super(`missing error ${paramName}`);
    this.name = "Missing Param Error";
  }
}
