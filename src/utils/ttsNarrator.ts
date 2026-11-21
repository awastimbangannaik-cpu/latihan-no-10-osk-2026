/**
 * Converts LaTeX math symbols and physics expressions into clear spoken Indonesian prose
 * for MISTER JO's Text-to-Speech narrator. Never speaks raw LaTeX tokens.
 */
export function sanitizePhysicsTextForSpeech(input: string): string {
  let text = input;

  // Replace display & inline math delimiters
  text = text.replace(/\$\$/g, ' ').replace(/\$/g, ' ');

  // Common physics/vector macros
  const replacements: Array<[RegExp, string]> = [
    [/\\Delta\s*\\vec\{r\}/g, 'vektor perpindahan delta r'],
    [/\\Delta\s*x/g, 'delta x'],
    [/\\Delta\s*y/g, 'delta y'],
    [/\\Delta\s*E_k/g, 'perubahan energi kinetik'],
    [/\\Delta\s*t/g, 'selang waktu delta t'],
    [/\\vec\{r\}_1/g, 'vektor posisi r satu'],
    [/\\vec\{r\}_2/g, 'vektor posisi r dua'],
    [/\\vec\{r\}/g, 'vektor posisi r'],
    [/\\vec\{F\}_\{\\text\{([^}]+)\}\}/g, 'vektor gaya $1'],
    [/\\vec\{F\}_([0-9a-zA-Z]+)/g, 'vektor gaya F $1'],
    [/\\vec\{F\}/g, 'vektor gaya F'],
    [/\\vec\{v\}_([0-9a-zA-Z]+)/g, 'vektor kecepatan v $1'],
    [/\\vec\{v\}/g, 'vektor kecepatan v'],
    [/\\vec\{a\}/g, 'vektor percepatan a'],
    [/\\vec\{([a-zA-Z])\}/g, 'vektor $1'],
    [/\\hat\{i\}/g, 'i topi'],
    [/\\hat\{j\}/g, 'j topi'],
    [/\\hat\{k\}/g, 'k topi'],
    [/\\hat\{n\}/g, 'vektor satuan normal n topi'],
    [/\\hat\{r\}/g, 'vektor satuan radial r topi'],
    [/\\cdot/g, ' dot '],
    [/\\times/g, ' dikali '],
    [/\\cos\s*\\theta/g, 'kosinus teta'],
    [/\\sin\s*\\theta/g, 'sinus teta'],
    [/\\cos\s*(\d+)\^\{\\circ\}/g, 'kosinus $1 derajat'],
    [/\\sin\s*(\d+)\^\{\\circ\}/g, 'sinus $1 derajat'],
    [/\\cos/g, 'kosinus'],
    [/\\sin/g, 'sinus'],
    [/\\theta/g, 'teta'],
    [/\\mu_k/g, 'koefisien gesek kinetik miu k'],
    [/\\mu/g, 'miu'],
    [/\\ell_0/g, 'panjang relaks l nol'],
    [/\\ell/g, 'l'],
    [/\\perp/g, 'tegak lurus'],
    [/\\parallel/g, 'sejajar'],
    [/\\approx/g, 'kira-kira sama dengan'],
    [/\\implies/g, 'sehingga'],
    [/\\iff/g, 'jika dan hanya jika'],
    [/\\to/g, 'menuju'],
    [/\\le/g, 'kurang dari atau sama dengan'],
    [/\\ge/g, 'lebih dari atau sama dengan'],
    [/\\sqrt\{([^}]+)\}/g, 'akar kuadrat dari $1'],
    [/\\frac\{([^}]+)\}\{([^}]+)\}/g, '$1 per $2'],
    [/\\int_\{([^}]+)\}\^\{([^}]+)\}/g, 'integral dari $1 sampai $2'],
    [/\\int/g, 'integral'],
    [/\\partial/g, 'turunan parsial'],
    [/\\text\{([^}]+)\}/g, '$1'],
    [/\\left|\\right|/g, ''],
    [/\\left|\\right/g, ''],
    [/\^2/g, ' kuadrat'],
    [/\^3/g, ' pangkat tiga'],
    [/\^4/g, ' pangkat empat'],
    [/\^\\circ/g, ' derajat'],
    [/(\d+),(\d+)/g, '$1 koma $2'],
    [/\{,\}/g, ' koma '],
    [/=/g, ' sama dengan '],
    [/[{}]/g, ' '],
    [/\\/g, ' '],
  ];

  for (const [pattern, replacement] of replacements) {
    text = text.replace(pattern, replacement);
  }

  return text.replace(/\s+/g, ' ').trim();
}

export type TtsPlaybackStatus = 'idle' | 'speaking' | 'paused' | 'unsupported';

export interface TtsStateSnapshot {
  status: TtsPlaybackStatus;
  activeTitle: string;
  activeText: string;
  hasIndonesianVoice: boolean;
}

class MisterJoNarratorController {
  private listeners = new Set<(state: TtsStateSnapshot) => void>();
  private state: TtsStateSnapshot = {
    status: 'idle',
    activeTitle: 'Siap Membimbing',
    activeText: '',
    hasIndonesianVoice: false,
  };
  private currentScript = '';
  private currentTitle = '';

  constructor() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      this.state.status = 'unsupported';
    } else {
      this.refreshVoices();
      window.speechSynthesis.onvoiceschanged = () => {
        this.refreshVoices();
      };
    }
  }

  private refreshVoices() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    const voices = window.speechSynthesis.getVoices();
    const hasId = voices.some((v) => v.lang.toLowerCase().startsWith('id'));
    if (hasId !== this.state.hasIndonesianVoice) {
      this.state = { ...this.state, hasIndonesianVoice: hasId };
      this.emit();
    }
  }

  private pickBestVoice(): SpeechSynthesisVoice | null {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;
    const voices = window.speechSynthesis.getVoices();
    // Prefer adult male Indonesian voice if present, otherwise any id-ID voice, otherwise default
    const idVoices = voices.filter((v) => v.lang.toLowerCase().startsWith('id'));
    const maleId = idVoices.find((v) =>
      /andika|ardi|rizky|budi|male|pria|laki/i.test(v.name)
    );
    if (maleId) return maleId;
    if (idVoices.length > 0) return idVoices[0];
    return voices[0] ?? null;
  }

  private emit() {
    for (const cb of this.listeners) {
      cb({ ...this.state });
    }
  }

  subscribe(listener: (state: TtsStateSnapshot) => void): () => void {
    this.listeners.add(listener);
    listener({ ...this.state });
    return () => {
      this.listeners.delete(listener);
    };
  }

  getState(): TtsStateSnapshot {
    return { ...this.state };
  }

  speak(title: string, rawText: string) {
    const cleanText = sanitizePhysicsTextForSpeech(rawText);
    this.currentTitle = title;
    this.currentScript = cleanText;

    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      this.state = {
        ...this.state,
        status: 'unsupported',
        activeTitle: title,
        activeText: cleanText,
      };
      this.emit();
      return;
    }

    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(cleanText);
      const voice = this.pickBestVoice();
      if (voice) utterance.voice = voice;
      utterance.lang = 'id-ID';
      // Authoritative adult male physics mentor cadence: slightly lower pitch, clear deliberate pace
      utterance.pitch = 0.88;
      utterance.rate = 0.96;
      utterance.volume = 1.0;

      utterance.onstart = () => {
        this.state = {
          ...this.state,
          status: 'speaking',
          activeTitle: title,
          activeText: cleanText,
        };
        this.emit();
      };

      utterance.onpause = () => {
        this.state = { ...this.state, status: 'paused' };
        this.emit();
      };

      utterance.onresume = () => {
        this.state = { ...this.state, status: 'speaking' };
        this.emit();
      };

      utterance.onend = () => {
        this.state = { ...this.state, status: 'idle' };
        this.emit();
      };

      utterance.onerror = () => {
        this.state = { ...this.state, status: 'idle' };
        this.emit();
      };

      this.state = {
        ...this.state,
        status: 'speaking',
        activeTitle: title,
        activeText: cleanText,
      };
      this.emit();

      window.speechSynthesis.speak(utterance);
    } catch {
      this.state = {
        ...this.state,
        status: 'idle',
        activeTitle: title,
        activeText: cleanText,
      };
      this.emit();
    }
  }

  pause() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
      window.speechSynthesis.pause();
      this.state = { ...this.state, status: 'paused' };
      this.emit();
    }
  }

  resume() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      this.state = { ...this.state, status: 'speaking' };
      this.emit();
    } else if (this.currentScript) {
      this.speak(this.currentTitle, this.currentScript);
    }
  }

  replay() {
    if (this.currentScript) {
      this.speak(this.currentTitle || 'Narasi Mister Jo', this.currentScript);
    }
  }

  stop() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.state = { ...this.state, status: 'idle' };
    this.emit();
  }
}

export const misterJoNarrator = new MisterJoNarratorController();
