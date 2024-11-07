// stompClient.js
import SockJS from 'sockjs-client';
import * as webstomp from 'webstomp-client';

export class StompClient {

  constructor (url, onConnect, onDisconnect) {
    this.url = url;
    this.onConnect = onConnect;
    this.onDisconnect = onDisconnect;
    this.connected = false;
    this.socket = null;
    this.client = null;
    this.callbacks = {};
  }

  connect (headers = {}) {
    if (this.connected) {
      return;
    }
    this.socket = new SockJS(this.url);
    this.client = webstomp.over(this.socket, { debug: false });
    this.client.connect(
      headers,
      () => {
        this.connected = true;
        if (this.onConnect) {
          this.onConnect(this);
        }
      },
      () => {
        this.connected = false;
        if (this.onDisconnect) {
          this.onDisconnect(this);
        }
      }
    );
  }

  disconnect () {
    if (!this.connected) {
      return;
    }
    this.client.disconnect(() => {
      this.connected = false;
    });
  }

  subscribe (destination, callback) {
    if (!this.connected) {
      this.callbacks[destination] = callback;
    }else{
        return this.client.subscribe(destination, callback);
    }
  }

    unsubscribe (destination) {
        if (this.connected) {
            delete this.callbacks[destination];
            this.client.unsubscribe(destination);
        }
    }

  send (destination, body, headers = {}) {
    if (!this.connected) {
      throw new Error('Client not connected');
    }
    this.client.send(destination, body, headers);
  }
}

const stompClient = new StompClient('http://localhost:8081/api/ws-connect-sj', () => {
  console.log('Connected');
}, () => {
  console.log('Disconnected');
});
stompClient.connect({
    'Authorization': 'Bearer ' + localStorage.getItem('token')
});

export default stompClient;
