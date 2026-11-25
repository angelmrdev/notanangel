import {keys,relation} from './harmony.mjs';
import {pitch} from './converter.mjs';
import {scale} from './wheel.mjs';
export function compare(a,b){const x=keys.find(k=>k.code===a),y=keys.find(k=>k.code===b);if(!x||!y)return null;const delta=(pitch(y.note)-pitch(x.note)+12)%12;const basic=relation(a,b);const kind=basic!=='other'?basic:delta===0?'parallel':x.minor===y.minor&&[1,2,3].includes(delta)?'creative':'other';const sa=scale(a),sb=scale(b);return {kind,delta,common:sa.filter(n=>sb.includes(n)),onlyA:sa.filter(n=>!sb.includes(n)),onlyB:sb.filter(n=>!sa.includes(n))};}
