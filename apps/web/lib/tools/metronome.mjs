export function tickInfo(index, beats, subdivision, phrase) {
  const beatIndex = Math.floor(index / subdivision);
  const beat = beatIndex % beats;
  const bar = Math.floor(beatIndex / beats);
  const main = index % subdivision === 0;
  return { beat: beat+1, bar:bar+1, phraseBar:bar%phrase+1, main, accent:main&&beat===0, phraseStart:main&&beat===0&&bar%phrase===0 };
}
export function tickSeconds(bpm, subdivision) { return 60/bpm/subdivision; }
