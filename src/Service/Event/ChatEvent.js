import EventEmitter from "events";
class ChatEvent extends EventEmitter {}
const Emmiter = new ChatEvent();
Emmiter.setMaxListeners(0);
export { Emmiter };
