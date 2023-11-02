import { WebSocket } from "ws";
import { BaseWebSocketExpressAdoon, BaseWebSocketListener } from "../../athaeck-websocket-express-base/base";
import { WebSocketHooks } from "../../athaeck-websocket-express-base/base/hooks";
import { ConnectingMindsEvents } from "../../Connecting-Minds-Data-Types/types";
import { ConnectingMindsSocket } from "../..";
import { Broadcast, ReceivedEvent } from "../../athaeck-websocket-express-base/base/helper";
import { ConnectingMindsHooks } from "../hooks/connectingMindsHooks";


class ConnectPlayerTwoListener extends BaseWebSocketListener {
    listenerKey: string;
    private _application: ConnectingMindsSocket

    constructor(webSocketServer: BaseWebSocketExpressAdoon, webSocket: WebSocket, hooks: WebSocketHooks) {
        super(webSocketServer, webSocket, hooks)
    }

    protected Init(): void {
        this._application = <ConnectingMindsSocket>this.webSocketServer
    }
    protected SetKey(): void {
        this.listenerKey = ConnectingMindsEvents.CONNECT_PLAYER_TWO
    }
    public OnDisconnection(webSocket: WebSocket, hooks: WebSocketHooks): void {

    }
    protected listener(body: any): void {
        const hooks: ConnectingMindsHooks = <ConnectingMindsHooks>this.webSocketHooks
        this._application.TakePlayerTwo(this.webSocket, hooks)

        const onConnectPlayerTwo: ReceivedEvent = new ReceivedEvent(ConnectingMindsEvents.ON_CONNECT_PLAYER_TWO)
        Broadcast(this._application.WebSocketServer, (ws: WebSocket) => {
            if (ws === this.webSocket) {
                return
            }
            ws.send(onConnectPlayerTwo.JSONString)
        })
    }

}

module.exports = ConnectPlayerTwoListener