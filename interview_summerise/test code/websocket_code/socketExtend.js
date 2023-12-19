
const ModeCode = {//websocket消息类型
  MSG: 'message',//普通消息
  HEART_BEAT: 'heart_beat'//心跳
}
class MyWebSocket extends WebSocket  {
  constructor(url, protocols) {
    super(url, protocols)
    return this
  }

  init(heatBeatConfig, isReconnect) {
    this.onopen = openHandler
    this.onclose = closeHandler
    this.onmessage = messageHandler
    this.onerror = ErrorHandler
    // { time: 心跳时间间隔, timeout: 心跳超时间隔, reconnect: 断开重连时间间隔}
    this.heatBeatConfig = heatBeatConfig
    this.isReconnect = isReconnect
    this.reconnectTimer = null
    this.webSocketStatus = false
  }

  openHandler() {
    this.webSocketStatus = true
    this.heatBeatConfig && this.heatBeatConfig.time ? this.startHeatBeat() : ''
  }
  closeHandler() {
    this.webSocketStatus = false
  }
  messageHandler(e) {
    const data = this.getMsg(e)
    switch(data.ModeCode) {
      case ModeCode.MSG: 
        $bus.emit('msg', data.msg)
        break;
      case ModeCode.HEART_BEAT:
        this.webSocketStatus = true
        console.log('get beat'+ data.msg)
        break;
    }
  }
  ErrorHandler() {
    this.webSocketStatus = false
    reconnectWebSocket()
  }

  sendMsg (obj) {
    this.send(JSON.stringify(obj))
  }
  getMsg (e) {
    return JSON.parse(e.data)
  }
  startHeatBeat() {

    setTimeout(() => {
      this.sendMsg({
        MSGCODE: ModeCode.HEART_BEAT,
        msg: Date.now()
      })

      this.waitServer()
    }, this.heatBeatConfig.time);

  }

  waitServer() {

    setTimeout(() => {
      if(this.webSocketStatus) {
        this.startHeatBeat(this.heatBeatConfig.time)
        return;
      }
      try {
        this.close()
      } catch (error) {
        console.log(error)
      }
      this.reconnectWebSocket()
    }, this.heatBeatConfig.timeout);

  }

  reconnectWebSocket() {
    if(!this.isReconnect) {
      return;
    }
    this.reconnectTimer = setTimeout(() => {
      this.$bus.emit('reconnect')
    }, this.heatBeatConfig.reconnect);
  }
}

const m = new MyWebSocket()
