import {Block} from "../Block";

export type Events = typeof Block.EVENTS[keyof typeof Block.EVENTS];
