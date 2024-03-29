import { BaseNoSQLExpressRouteExtension } from "../../../../../athaeck-express-nosql-extension/base";
import { ExpressRouteType, makeResponse } from "../../../../../athaeck-websocket-express-base/athaeck-express-base/base/express";
import { Request, Response, NextFunction } from "express"
import { GetGUID } from "../../../../../athaeck-websocket-express-base/base/helper";
import { Db, Collection } from "mongodb";

class SetUnlockedPathsEndpoint extends BaseNoSQLExpressRouteExtension {
  dbName: string;
  private _collectionName: string = "unlockedPaths";

  constructor() {
    super("/world/unlockedPaths/set", ExpressRouteType.POST);
    this.dbName = "world";
  }
  handleRequest = async (
    _req: Request,
    _res: Response,
    _next: NextFunction
  ) => {

    let response: any;
    let status: number;
    const documents: any[] = [];

    for (const e of _req.body) {
      if (e.hasOwnProperty("_id")) {
        e["_id"] = GetGUID()
        documents.push(e)
      } else {
        documents.push({
          _id: GetGUID(),
          ...e,
        });
      }
    }
    console.log("documents to index: ", documents);

    if (this.db && documents.length > 0) {

      const db: Db = <Db>this.db;

      const collection: Collection = db.collection(this._collectionName);

      await collection.deleteMany({});

      await collection.insertMany(documents);

      response = "completed";
      status = 200;
    } else {
      response = "this.db ist undefined";
      status = 500;
    }
    if (documents.length === 0) {
      response = "completed";
      status = 200;
    }

    makeResponse(_res, status, response);
  };
}


module.exports = SetUnlockedPathsEndpoint