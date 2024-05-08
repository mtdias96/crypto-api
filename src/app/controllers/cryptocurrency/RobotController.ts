/*
* 1 - Monitoramento
* 2 - Estrategia
* 3 - Trade
*/
import WebSocket from 'ws';
import { env } from '../../config/env';


const ws = new WebSocket(env.streamUrl)

console.log(ws);