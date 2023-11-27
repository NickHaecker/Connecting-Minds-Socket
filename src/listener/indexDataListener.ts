import { WebSocket } from "ws";
import { BaseWebSocketExpressAdoon, BaseWebSocketListener } from "../../athaeck-websocket-express-base/base";
import { WebSocketHooks } from "../../athaeck-websocket-express-base/base/hooks";
import { ConnectingMindsEvents, FilesToIndex } from "../../Connecting-Minds-Data-Types/types";
import { ConnectingMindsSocket } from "../..";
import { Broadcast, ReceivedEvent } from "../../athaeck-websocket-express-base/base/helper";
// import { ConnectingMindsHooks } from "../hooks/connectingMindsHooks";




class IndexDataListener extends BaseWebSocketListener {
    listenerKey: string;
    private _application: ConnectingMindsSocket

    constructor(webSocketServer: BaseWebSocketExpressAdoon, webSocket: WebSocket, hooks: WebSocketHooks) {
        super(webSocketServer, webSocket, hooks)
    }

    protected Init(): void {
        this._application = <ConnectingMindsSocket>this.webSocketServer
    }
    protected SetKey(): void {
        this.listenerKey = ConnectingMindsEvents.INDEX_DATA
    }
    public OnDisconnection(webSocket: WebSocket, hooks: WebSocketHooks): void {

    }
    protected listener(body: any): void {
        const data = <FilesToIndex>body
        // // const hooks: ConnectingMindsHooks = <ConnectingMindsHooks>this.webSocketHooks
        // // this._application.TakePlayerOne(this.webSocket, hooks)

        console.log(data)

        // const onConnectPlayerOne: ReceivedEvent = new ReceivedEvent(ConnectingMindsEvents.ON_CONNECT_PLAYER_ONE)
        // onConnectPlayerOne.addData("Test", "Test")
        // Broadcast(this._application.WebSocketServer, (ws: WebSocket) => {
        //     // if (ws === this.webSocket) {
        //     //     return
        //     // }
        //     ws.send(onConnectPlayerOne.JSONString)
        // })

        const responseEvent: ReceivedEvent = new ReceivedEvent(ConnectingMindsEvents.ON_INDEX_DATA);
        responseEvent.addData("Message", "Läuft")

        this.webSocket.send(responseEvent.JSONString)
    }

}
module.exports = IndexDataListener