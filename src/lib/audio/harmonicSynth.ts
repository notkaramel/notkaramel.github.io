// Dreamy Web Audio Circle-of-Fifths harmonic engine.
// Cycles infinitely clockwise around all 12 keys of the Circle of Fifths
// (C -> G -> D -> A -> E -> B -> F# -> C# -> Ab -> Eb -> Bb -> F -> C ...),
// sounding a sustaining Perfect 5th chord at each key change, flowing through
// a 5-note open-fifth progression, and randomly switching synth styles on every new rotation.

type SongNote = {
  label: string;
  freq: number;
};

type CircleKey = {
  key: string;
  rootFreq: number;
  notes: SongNote[];
};

type SynthStyle =
  "celesta" | "felt-piano" | "rhodes" | "cloud-pad" | "kalimba" | "glass-harp";

const SYNTH_STYLES: SynthStyle[] = [
  "celesta",
  "felt-piano",
  "rhodes",
  "cloud-pad",
  "kalimba",
  "glass-harp",
];

const CIRCLE_OF_FIFTHS: CircleKey[] = [
  {
    key: "C",
    rootFreq: 130.81,
    notes: [
      { label: "C3", freq: 130.81 },
      { label: "G3", freq: 196.0 },
      { label: "C4", freq: 261.63 },
      { label: "D4", freq: 293.66 },
      { label: "G4", freq: 392.0 },
    ],
  },
  {
    key: "G",
    rootFreq: 196.0,
    notes: [
      { label: "G3", freq: 196.0 },
      { label: "D4", freq: 293.66 },
      { label: "G4", freq: 392.0 },
      { label: "A4", freq: 440.0 },
      { label: "D5", freq: 587.33 },
    ],
  },
  {
    key: "D",
    rootFreq: 146.83,
    notes: [
      { label: "D3", freq: 146.83 },
      { label: "A3", freq: 220.0 },
      { label: "D4", freq: 293.66 },
      { label: "E4", freq: 329.63 },
      { label: "A4", freq: 440.0 },
    ],
  },
  {
    key: "A",
    rootFreq: 220.0,
    notes: [
      { label: "A3", freq: 220.0 },
      { label: "E4", freq: 329.63 },
      { label: "A4", freq: 440.0 },
      { label: "B4", freq: 493.88 },
      { label: "E5", freq: 659.25 },
    ],
  },
  {
    key: "E",
    rootFreq: 164.81,
    notes: [
      { label: "E3", freq: 164.81 },
      { label: "B3", freq: 246.94 },
      { label: "E4", freq: 329.63 },
      { label: "F♯4", freq: 369.99 },
      { label: "B4", freq: 493.88 },
    ],
  },
  {
    key: "B",
    rootFreq: 246.94,
    notes: [
      { label: "B3", freq: 246.94 },
      { label: "F♯4", freq: 369.99 },
      { label: "B4", freq: 493.88 },
      { label: "C♯5", freq: 554.37 },
      { label: "F♯5", freq: 739.99 },
    ],
  },
  {
    key: "F♯",
    rootFreq: 185.0,
    notes: [
      { label: "F♯3", freq: 185.0 },
      { label: "C♯4", freq: 277.18 },
      { label: "F♯4", freq: 369.99 },
      { label: "G♯4", freq: 415.3 },
      { label: "C♯5", freq: 554.37 },
    ],
  },
  {
    key: "C♯",
    rootFreq: 138.59,
    notes: [
      { label: "C♯3", freq: 138.59 },
      { label: "G♯3", freq: 207.65 },
      { label: "C♯4", freq: 277.18 },
      { label: "D♯4", freq: 311.13 },
      { label: "G♯4", freq: 415.3 },
    ],
  },
  {
    key: "A♭",
    rootFreq: 207.65,
    notes: [
      { label: "A♭3", freq: 207.65 },
      { label: "E♭4", freq: 311.13 },
      { label: "A♭4", freq: 415.3 },
      { label: "B♭4", freq: 466.16 },
      { label: "E♭5", freq: 622.25 },
    ],
  },
  {
    key: "E♭",
    rootFreq: 155.56,
    notes: [
      { label: "E♭3", freq: 155.56 },
      { label: "B♭3", freq: 233.08 },
      { label: "E♭4", freq: 311.13 },
      { label: "F4", freq: 349.23 },
      { label: "B♭4", freq: 466.16 },
    ],
  },
  {
    key: "B♭",
    rootFreq: 233.08,
    notes: [
      { label: "B♭3", freq: 233.08 },
      { label: "F4", freq: 349.23 },
      { label: "B♭4", freq: 466.16 },
      { label: "C5", freq: 523.25 },
      { label: "F5", freq: 698.46 },
    ],
  },
  {
    key: "F",
    rootFreq: 174.61,
    notes: [
      { label: "F3", freq: 174.61 },
      { label: "C4", freq: 261.63 },
      { label: "F4", freq: 349.23 },
      { label: "G4", freq: 392.0 },
      { label: "C5", freq: 523.25 },
    ],
  },
];

const NOTE_GLYPHS = ["♩", "♪", "♫", "♬", "♪"];

export type PlayedNoteInfo = {
  noteLabel: string;
  glyph: string;
};

let audioCtx: AudioContext | null = null;
let compressorNode: DynamicsCompressorNode | null = null;
let masterGain: GainNode | null = null;
let analyserNode: AnalyserNode | null = null;
let freqBuffer: Uint8Array<ArrayBuffer> | null = null;
let activeTimeDomainBuffer: Uint8Array<ArrayBuffer> | null = null;

let circleIndex = 0; // 0..11 around Circle of Fifths
let progressionStep = 0; // 0..4 within current key's 5-note bar
let currentSynthStyle: SynthStyle = SYNTH_STYLES[0];
let lastInputTime = 0;

const COLUMN_COUNT_MAX = 64;
let columnMapping = Array.from({ length: COLUMN_COUNT_MAX }, (_, i) => i);
let columnWeights = Array.from({ length: COLUMN_COUNT_MAX }, () => 1);

function pickRandomSynthStyle(): SynthStyle {
  const candidates = SYNTH_STYLES.filter((s) => s !== currentSynthStyle);
  return candidates[Math.floor(Math.random() * candidates.length)];
}

function shuffleColumnOrder(count: number) {
  const indices = Array.from({ length: count }, (_, i) => i);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  columnMapping = indices;
  columnWeights = Array.from({ length: count }, (_, i) => {
    const rank = indices[i];
    const tier = 1 - (rank / count) * 0.55;
    return tier * (0.55 + Math.random() * 0.65);
  });
}

const activityListeners = new Set<() => void>();

export function onAudioActivity(listener: () => void): () => void {
  activityListeners.add(listener);
  return () => {
    activityListeners.delete(listener);
  };
}

function ensureAudioGraph(): { ctx: AudioContext; out: AudioNode } | null {
  if (typeof window === "undefined") return null;

  const AudioContextClass =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext;
  if (!AudioContextClass) return null;

  if (!audioCtx) {
    audioCtx = new AudioContextClass();

    compressorNode = audioCtx.createDynamicsCompressor();
    compressorNode.threshold.setValueAtTime(-18, audioCtx.currentTime);
    compressorNode.knee.setValueAtTime(24, audioCtx.currentTime);
    compressorNode.ratio.setValueAtTime(6, audioCtx.currentTime);
    compressorNode.attack.setValueAtTime(0.005, audioCtx.currentTime);
    compressorNode.release.setValueAtTime(0.25, audioCtx.currentTime);

    masterGain = audioCtx.createGain();
    masterGain.gain.setValueAtTime(0.68, audioCtx.currentTime);

    analyserNode = audioCtx.createAnalyser();
    analyserNode.fftSize = 128;
    analyserNode.smoothingTimeConstant = 0.72;
    freqBuffer = new Uint8Array(
      new ArrayBuffer(analyserNode.frequencyBinCount),
    );
    activeTimeDomainBuffer = new Uint8Array(
      new ArrayBuffer(analyserNode.fftSize),
    );

    compressorNode.connect(masterGain);
    masterGain.connect(analyserNode);
    analyserNode.connect(audioCtx.destination);
    return { ctx: audioCtx, out: compressorNode };
  }

  if (audioCtx.state === "suspended") {
    void audioCtx.resume();
  }

  return compressorNode ? { ctx: audioCtx, out: compressorNode } : null;
}

function triggerVoice(
  ctx: AudioContext,
  destination: AudioNode,
  freq: number,
  peakGain: number,
  duration: number,
  style: SynthStyle,
  delay = 0,
  pan = 0,
) {
  const start = ctx.currentTime + delay;
  const filter = ctx.createBiquadFilter();
  const env = ctx.createGain();
  const clampedPan = Math.max(-0.4, Math.min(0.4, pan));

  let outputNode: AudioNode = env;
  if (typeof ctx.createStereoPanner === "function") {
    const panner = ctx.createStereoPanner();
    panner.pan.setValueAtTime(clampedPan, start);
    env.connect(panner);
    panner.connect(destination);
    outputNode = env;
  } else {
    env.connect(destination);
  }

  filter.type = "lowpass";
  filter.connect(outputNode);

  if (style === "felt-piano") {
    // Muted warm felt piano: triangle + warm sub-octave sine
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const subGain = ctx.createGain();

    osc1.type = "triangle";
    osc1.frequency.setValueAtTime(freq, start);
    osc2.type = "sine";
    osc2.frequency.setValueAtTime(freq * 0.5, start);
    subGain.gain.setValueAtTime(0.22, start);

    filter.frequency.setValueAtTime(Math.min(1600, freq * 2.5), start);
    filter.frequency.exponentialRampToValueAtTime(
      Math.max(260, freq * 1.1),
      start + duration * 0.85,
    );

    env.gain.setValueAtTime(0.0001, start);
    env.gain.linearRampToValueAtTime(peakGain, start + 0.028);
    env.gain.exponentialRampToValueAtTime(0.0001, start + duration * 1.1);

    osc1.connect(filter);
    osc2.connect(subGain);
    subGain.connect(filter);
    osc1.start(start);
    osc2.start(start);
    osc1.stop(start + duration * 1.15);
    osc2.stop(start + duration * 1.15);
    return;
  }

  if (style === "rhodes") {
    // Pastel electric piano: detuned warm sine + quick bell-tine transient
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const tine = ctx.createOscillator();
    const osc2Gain = ctx.createGain();
    const tineGain = ctx.createGain();

    osc1.type = "sine";
    osc1.frequency.setValueAtTime(freq, start);
    osc2.type = "sine";
    osc2.frequency.setValueAtTime(freq, start);
    osc2.detune.setValueAtTime(4, start);
    osc2Gain.gain.setValueAtTime(0.55, start);

    tine.type = "sine";
    tine.frequency.setValueAtTime(freq * 3, start);
    tineGain.gain.setValueAtTime(0.22, start);
    tineGain.gain.exponentialRampToValueAtTime(0.001, start + 0.16);

    filter.frequency.setValueAtTime(Math.min(2400, freq * 4), start);
    filter.frequency.exponentialRampToValueAtTime(
      Math.max(380, freq * 1.3),
      start + duration * 0.85,
    );

    env.gain.setValueAtTime(0.0001, start);
    env.gain.linearRampToValueAtTime(peakGain, start + 0.012);
    env.gain.exponentialRampToValueAtTime(0.0001, start + duration);

    osc1.connect(filter);
    osc2.connect(osc2Gain);
    osc2Gain.connect(filter);
    tine.connect(tineGain);
    tineGain.connect(filter);

    osc1.start(start);
    osc2.start(start);
    tine.start(start);
    osc1.stop(start + duration + 0.05);
    osc2.stop(start + duration + 0.05);
    tine.stop(start + 0.22);
    return;
  }

  if (style === "cloud-pad") {
    // Dreamy lush cloud pad: slow bloom attack + detuned chorus trio
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const osc3 = ctx.createOscillator();
    const triGain = ctx.createGain();

    osc1.type = "sine";
    osc1.frequency.setValueAtTime(freq, start);
    osc1.detune.setValueAtTime(-7, start);

    osc2.type = "sine";
    osc2.frequency.setValueAtTime(freq, start);
    osc2.detune.setValueAtTime(7, start);

    osc3.type = "triangle";
    osc3.frequency.setValueAtTime(freq, start);
    triGain.gain.setValueAtTime(0.14, start);

    filter.frequency.setValueAtTime(Math.min(1800, freq * 3), start);
    filter.frequency.exponentialRampToValueAtTime(
      Math.max(320, freq * 1.25),
      start + duration * 1.1,
    );

    env.gain.setValueAtTime(0.0001, start);
    env.gain.linearRampToValueAtTime(peakGain * 0.88, start + 0.085);
    env.gain.exponentialRampToValueAtTime(0.0001, start + duration * 1.25);

    osc1.connect(filter);
    osc2.connect(filter);
    osc3.connect(triGain);
    triGain.connect(filter);

    osc1.start(start);
    osc2.start(start);
    osc3.start(start);
    osc1.stop(start + duration * 1.3);
    osc2.stop(start + duration * 1.3);
    osc3.stop(start + duration * 1.3);
    return;
  }

  if (style === "kalimba") {
    // Crisp wooden kalimba / harp pluck
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const pluckGain = ctx.createGain();

    osc1.type = "sine";
    osc1.frequency.setValueAtTime(freq, start);
    osc2.type = "triangle";
    osc2.frequency.setValueAtTime(freq * 2, start);
    pluckGain.gain.setValueAtTime(0.28, start);
    pluckGain.gain.exponentialRampToValueAtTime(0.001, start + 0.22);

    filter.frequency.setValueAtTime(Math.min(3200, freq * 6), start);
    filter.frequency.exponentialRampToValueAtTime(
      Math.max(400, freq * 1.4),
      start + duration * 0.6,
    );

    env.gain.setValueAtTime(0.0001, start);
    env.gain.linearRampToValueAtTime(peakGain * 1.05, start + 0.006);
    env.gain.exponentialRampToValueAtTime(0.0001, start + duration * 0.78);

    osc1.connect(filter);
    osc2.connect(pluckGain);
    pluckGain.connect(filter);

    osc1.start(start);
    osc2.start(start);
    osc1.stop(start + duration * 0.85);
    osc2.stop(start + duration * 0.85);
    return;
  }

  if (style === "glass-harp") {
    // Airy glass harmonica: blooming sine + octave + soft fifth shimmer
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const osc3 = ctx.createOscillator();
    const g2 = ctx.createGain();
    const g3 = ctx.createGain();

    osc1.type = "sine";
    osc1.frequency.setValueAtTime(freq, start);

    osc2.type = "sine";
    osc2.frequency.setValueAtTime(freq * 2, start);
    g2.gain.setValueAtTime(0.16, start);

    osc3.type = "sine";
    osc3.frequency.setValueAtTime(freq * 1.5, start);
    g3.gain.setValueAtTime(0.09, start);

    filter.frequency.setValueAtTime(Math.min(2800, freq * 5), start);
    filter.frequency.exponentialRampToValueAtTime(
      Math.max(500, freq * 1.8),
      start + duration,
    );

    env.gain.setValueAtTime(0.0001, start);
    env.gain.linearRampToValueAtTime(peakGain * 0.92, start + 0.05);
    env.gain.exponentialRampToValueAtTime(0.0001, start + duration * 1.12);

    osc1.connect(filter);
    osc2.connect(g2);
    g2.connect(filter);
    osc3.connect(g3);
    g3.connect(filter);

    osc1.start(start);
    osc2.start(start);
    osc3.start(start);
    osc1.stop(start + duration * 1.18);
    osc2.stop(start + duration * 1.18);
    osc3.stop(start + duration * 1.18);
    return;
  }

  // Default: "celesta"
  const osc1 = ctx.createOscillator();
  const osc2 = ctx.createOscillator();
  const overtoneGain = ctx.createGain();

  osc1.type = "sine";
  osc1.frequency.setValueAtTime(freq, start);

  osc2.type = "triangle";
  osc2.frequency.setValueAtTime(freq * 2, start);
  overtoneGain.gain.setValueAtTime(0.12, start);

  filter.frequency.setValueAtTime(Math.min(2400, freq * 4.5), start);
  filter.frequency.exponentialRampToValueAtTime(
    Math.max(360, freq * 1.35),
    start + duration * 0.9,
  );

  env.gain.setValueAtTime(0.0001, start);
  env.gain.linearRampToValueAtTime(peakGain, start + 0.018);
  env.gain.exponentialRampToValueAtTime(0.0001, start + duration);

  osc1.connect(filter);
  osc2.connect(overtoneGain);
  overtoneGain.connect(filter);

  osc1.start(start);
  osc2.start(start);
  osc1.stop(start + duration + 0.05);
  osc2.stop(start + duration + 0.05);
}

/**
 * Reads normalized (0..1) column levels driven by live audio energy,
 * distributed in a fresh random order around the entire ring on each note.
 */
export function sampleAudioColumns(columnCount: number): {
  levels: number[];
  active: boolean;
} {
  if (!analyserNode || !freqBuffer || !activeTimeDomainBuffer || !audioCtx) {
    return { levels: Array(columnCount).fill(0), active: false };
  }

  analyserNode.getByteFrequencyData(freqBuffer);
  analyserNode.getByteTimeDomainData(activeTimeDomainBuffer);

  let sumSq = 0;
  for (let i = 0; i < activeTimeDomainBuffer.length; i++) {
    const centered = (activeTimeDomainBuffer[i] - 128) / 128;
    sumSq += centered * centered;
  }
  const rms = Math.sqrt(sumSq / activeTimeDomainBuffer.length);
  const overallEnergy = Math.min(1, Math.pow(rms * 3.8, 0.72));

  const lowBins = Math.min(freqBuffer.length, 8);
  const levels = new Array<number>(columnCount);
  let maxEnergy = overallEnergy;
  const elapsedMs = performance.now() - lastInputTime;

  for (let i = 0; i < columnCount; i++) {
    const shuffledRank = columnMapping[i] ?? i;
    const weight = columnWeights[i] ?? 0.8;
    const binVal = freqBuffer[shuffledRank % lowBins] / 255;
    const staggerDelay = (shuffledRank / columnCount) * 140;
    const onsetGate = elapsedMs >= staggerDelay ? 1 : 0.25;

    const combined =
      (overallEnergy * 0.72 + binVal * 0.45) * weight * onsetGate;
    const level = Math.min(1, combined);
    levels[i] = level;
    if (level > maxEnergy) maxEnergy = level;
  }

  const withinRecentWindow = elapsedMs < 2100;
  return {
    levels,
    active: maxEnergy > 0.015 || withinRecentWindow,
  };
}

/**
 * Plays a looping infinite song progression around the Circle of Fifths.
 * Each key plays a full 5-note progression over a sustaining Perfect 5th chord,
 * randomly switches synth styles on every new rotation, and pans spatially (-0.4..0.4).
 */
export function playKeyProgressionNote(pan = 0): PlayedNoteInfo {
  lastInputTime = performance.now();
  shuffleColumnOrder(28);

  if (progressionStep === 0) {
    currentSynthStyle = pickRandomSynthStyle();
  }

  const keyData = CIRCLE_OF_FIFTHS[circleIndex];
  const stepIndex = progressionStep;
  const currentNote = keyData.notes[stepIndex];
  const style = currentSynthStyle;
  const clampedPan = Math.max(-0.4, Math.min(0.4, pan));
  const chordPan = clampedPan * 0.65;

  const rootFreq = keyData.rootFreq;
  const fifthFreq = rootFreq * 1.5;
  const octaveFreq = rootFreq * 2;

  const noteInfo: PlayedNoteInfo = {
    noteLabel: currentNote.label,
    glyph: NOTE_GLYPHS[stepIndex % NOTE_GLYPHS.length],
  };

  const graph = ensureAudioGraph();
  if (graph) {
    if (stepIndex === 0) {
      triggerVoice(
        graph.ctx,
        graph.out,
        rootFreq,
        0.095,
        2.5,
        style,
        0,
        chordPan,
      );
      triggerVoice(
        graph.ctx,
        graph.out,
        fifthFreq,
        0.085,
        2.4,
        style,
        0.015,
        clampedPan,
      );
      triggerVoice(
        graph.ctx,
        graph.out,
        octaveFreq,
        0.065,
        2.1,
        style,
        0.03,
        clampedPan,
      );
    } else {
      triggerVoice(
        graph.ctx,
        graph.out,
        currentNote.freq,
        0.11,
        1.55,
        style,
        0,
        clampedPan,
      );
      triggerVoice(
        graph.ctx,
        graph.out,
        rootFreq,
        0.032,
        1.4,
        style,
        0.01,
        chordPan,
      );
      triggerVoice(
        graph.ctx,
        graph.out,
        fifthFreq,
        0.032,
        1.4,
        style,
        0.02,
        chordPan,
      );
    }

    for (const listener of activityListeners) {
      listener();
    }
  }

  progressionStep += 1;
  if (progressionStep >= 5) {
    progressionStep = 0;
    circleIndex = (circleIndex + 1) % CIRCLE_OF_FIFTHS.length;
  }

  return noteInfo;
}
