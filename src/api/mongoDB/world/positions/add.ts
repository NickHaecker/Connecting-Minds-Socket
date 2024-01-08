import { BaseNoSQLExpressRouteExtension } from "../../../../../athaeck-express-nosql-extension/base";
import { ExpressRouteType } from "../../../../../athaeck-websocket-express-base/athaeck-express-base/base/express";


class AddPositionEndpoint extends BaseNoSQLExpressRouteExtension{
    dbName: string;
    private _collectionName: string = "positions";
  
    constructor() {
      super("/world/positions/add", ExpressRouteType.POST);
      this.dbName = "world";
    }
    
}


module.exports = AddPositionEndpoint