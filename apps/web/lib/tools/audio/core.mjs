export const LIMITS = Object.freeze({ bytes: 50 * 1024 * 1024, seconds: 600, rate: 22050, bins: 512 });
export function validateAudio(length, rate, channels) {
  if (!Number.isSafeInteger(length) || length < 1 || !Number.isFinite(rate) || rate < 8000 || rate > 192000 || !Number.isInteger(channels) || channels < 1 || channels > 8) throw new Error('invalid-audio');
  if (length / rate > LIMITS.seconds) throw new Error('duration-limit');
}
// Windowed peak envelope across channels avoids cancellation of opposite-phase stereo.
export function waveform(channels, bins = LIMITS.bins) {
  const length = channels[0]?.length ?? 0;
  if (!length || !Number.isInteger(bins) || bins < 1 || bins > 4096 || channels.some(c => c.length !== length)) throw new Error('invalid-audio');
  const count = Math.min(length, bins), peaks = new Float32Array(count);
  for (let b = 0; b < count; b++) {
    const end = Math.floor((b + 1) * length / count);
    for (let i = Math.floor(b * length / count); i < end; i++) for (const c of channels) {
      const v = c[i]; if (!Number.isFinite(v)) throw new Error('invalid-audio');
      peaks[b] = Math.max(peaks[b], Math.abs(v));
    }
  }
  return peaks;
}
// Windowed sinc low-pass resampling, with normalized edge weights.
export function resample(input, from, to = LIMITS.rate) {
  if (!input.length || !Number.isFinite(from) || !Number.isFinite(to) || from <= 0 || to <= 0) throw new Error('invalid-audio');
  if (from === to) return input.slice();
  const ratio = from / to, cutoff = Math.min(1, 1 / ratio) * .94, radius = Math.ceil(12 / cutoff);
  const out = new Float32Array(Math.max(1, Math.floor(input.length / ratio)));
  for (let i = 0; i < out.length; i++) {
    const pos = i * ratio; let sum = 0, weight = 0;
    for (let j = Math.max(0, Math.ceil(pos-radius)); j <= Math.min(input.length-1, Math.floor(pos+radius)); j++) {
      const d = pos-j, x = Math.PI*d*cutoff;
      const w = cutoff * (x === 0 ? 1 : Math.sin(x)/x) * (.5+.5*Math.cos(Math.PI*d/radius));
      sum += input[j]*w; weight += w;
    }
    out[i] = weight ? sum/weight : 0;
  }
  return out;
}
export function prepare(channels, rate, progress = () => {}) {
  const length = channels[0]?.length ?? 0; validateAudio(length, rate, channels.length);
  const peaks = waveform(channels); progress(.35);
  const mono = new Float32Array(length); let energy = 0, monoEnergy = 0, strongest = 0, strongestEnergy = -1;
  for (let c = 0; c < channels.length; c++) {
    let e = 0; for (let i = 0; i < length; i++) { const v = channels[c][i]; mono[i] += v / channels.length; e += v*v; }
    energy += e; if (e > strongestEnergy) { strongest = c; strongestEnergy = e; }
  }
  for (const v of mono) monoEnergy += v*v;
  const fallback = monoEnergy < energy / channels.length * .01;
  const samples = resample(fallback ? channels[strongest] : mono, rate); progress(1);
  return { samples, peaks, sampleRate: LIMITS.rate, duration: length/rate, channels: channels.length, decodedSampleRate: rate, rms: Math.sqrt(energy/(length*channels.length)), downmix: fallback ? 'strongest-channel' : 'average' };
}
