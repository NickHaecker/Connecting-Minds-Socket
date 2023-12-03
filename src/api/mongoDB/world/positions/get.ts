import { BaseNoSQLExpressRouteExtension } from "../../../../../athaeck-express-nosql-extension/base";
import { ExpressRouteType } from "../../../../../athaeck-websocket-express-base/athaeck-express-base/base/express";


class GetPositionsEndpoint extends BaseNoSQLExpressRouteExtension{
    dbName: string;
    private _collectionName: string = "Positions";
  
    constructor() {
      super("/world/positions/get", ExpressRouteType.GET);
      this.dbName = "World";
    }
    
}


module.exports = GetPositionsEndpoint