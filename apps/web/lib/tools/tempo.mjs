export function pitchPercent(from, to) { return (to / from - 1) * 100; }
export function targetTempo(from, pitch) { return from * (1 + pitch / 100); }
export function beatMs(bpm) { return 60000 / bpm; }
export function tapTempo(taps) { return taps.length < 2 ? null : 60000 * (taps.length - 1) / (taps[taps.length - 1] - taps[0]); }
