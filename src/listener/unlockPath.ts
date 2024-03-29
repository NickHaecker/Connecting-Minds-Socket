import { WebSocket } from "ws";
import { BaseWebSocketListener } from "../../athaeck-websocket-express-base/base";
import { WebSocketHooks } from "../../athaeck-websocket-express-base/base/hooks";
import { Session } from "../data/session";
import { PassListener } from "../types/passListener";
import { ConnectingMindsHooks } from "../hooks/connectingMindsHook";
import { ConnectingMindsSocket } from "../../index";
import { Player } from "../data/player";
import { ConnectingMindsEvents, UnlockedPath } from "../../Connecting-Minds-Data-Types/types";
import { EmitSessionNetworkError } from "../helper/sessionNetworkError";



class UnlockPathListener extends BaseWebSocketListener implements PassListener {
    listenerKey: string;
    private _application: ConnectingMindsSocket
    private _session: Session | null;
    private _player: Player | null

    constructor(webSocketServer: ConnectingMindsSocket, webSocket: WebSocket, webSocketHooks: ConnectingMindsHooks) {
        super(webSocketServer, webSocket, webSocketHooks);
        this._application = webSocketServer;

        this.webSocketHooks.SubscribeHookListener(ConnectingMindsHooks.CREATE_PLAYER, this.OnCreatePlayer.bind(this));
    }
    private OnCreatePlayer(player: Player): void {
        this._player = player
        this._player.TakeListener(this)
    }

    protected Init(): void {

    }
    protected SetKey(): void {
        this.listenerKey = ConnectingMindsEvents.UNLOCK_PATH
    }
    public OnDisconnection(webSocket: WebSocket, hooks: WebSocketHooks): void {
        this.webSocketHooks.UnSubscribeListener(ConnectingMindsHooks.CREATE_PLAYER, this.OnCreatePlayer.bind(this));
    }
    protected listener(body: any): void {
        if (this._session === null) {
            EmitSessionNetworkError(this.webSocket)

            return;
        }
        const unlockedPath: UnlockedPath = body.UnlockedPath
        this._session.UnlockPath(unlockedPath)
        
    }
    TakeSession(session: Session): void {
        this._session = session
    }
    RemoveSession(session: Session): void {
        this._session = null
    }

}

module.exports = UnlockPathListener