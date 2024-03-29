import { BaseNoSQLExpressRouteExtension } from "../../../../../athaeck-express-nosql-extension/base";
import { ExpressRouteType } from "../../../../../athaeck-websocket-express-base/athaeck-express-base/base/express";


class RemoveUnlockedPositionEndpoint extends BaseNoSQLExpressRouteExtension{
    dbName: string;
    private _collectionName: string = "unlockedPositions";
  
    constructor() {
      super("/world/unlockedPaths/del", ExpressRouteType.DELETE);
      this.dbName = "world";
    }
    
}


module.exports = RemoveUnlockedPositionEndpoint