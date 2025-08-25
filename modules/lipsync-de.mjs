/**
* @class German lip-sync processor
* @author Implementation based on Amazon Polly research and German phonetic analysis
*/

class LipsyncDe {

  /**
  * @constructor
  */
  constructor() {

    // German IPA phonemes to Oculus visemes, based on Amazon Polly research
    // Corrections applied: German R [ʀ] -> SS, affricates [pf] -> SS
    this.phonemeToViseme = {
      // Vowels - Long
      'iː': 'I',   'yː': 'U',   'uː': 'U',   'eː': 'E',   'øː': 'O',   
      'oː': 'O',   'ɛː': 'E',   'aː': 'aa',
      
      // Vowels - Short  
      'ɪ': 'I',    'ʏ': 'U',    'ʊ': 'U',    'ɛ': 'E',    'œ': 'O',    
      'ɔ': 'O',    'a': 'aa',
      
      // Reduced vowels
      'ə': 'E',    'ɐ': 'aa',
      
      // Diphthongs
      'aɪ': 'aa I', 'aʊ': 'aa U', 'ɔʏ': 'O I',
      
      // Consonants - Bilabials
      'p': 'PP',   'b': 'PP',   'm': 'PP',
      
      // Labiodentals  
      'f': 'FF',   'v': 'FF',
      
      // Alveolars
      't': 'DD',   'd': 'DD',   'n': 'nn',   'l': 'nn',   's': 'SS',   'z': 'SS',
      
      // Post-alveolars
      'ʃ': 'SS',   'ʒ': 'SS',   'tʃ': 'CH',  'dʒ': 'CH',
      
      // Velars/Uvulars
      'k': 'kk',   'g': 'kk',   'ŋ': 'nn',   'x': 'kk',   'ç': 'kk',
      
      // German R (research-based correction: uvular R -> SS not RR)
      'ʀ': 'SS',   'ʁ': 'SS',   'r': 'RR',
      
      // Affricates (key German feature)
      'pf': 'SS',  'ts': 'SS',
      
      // Approximants  
      'j': 'I',    'h': 'kk'
    };

    // German orthographic patterns to IPA phonemes
    // Handles consonant clusters, umlauts, and common letter combinations
    this.letterRules = {
      // Consonant clusters (critical for German)
      'sch': 'ʃ',     'tsch': 'tʃ',   'pf': 'pf',    'qu': 'kv',
      'ck': 'k',      'dt': 't',      'ng': 'ŋ',     'nk': 'ŋk',
      'sp': 'ʃp',     'st': 'ʃt',     // Initial sp/st -> ʃp/ʃt in German
      
      // Umlauts and special characters
      'ä': 'ɛ',       'ö': 'ø',       'ü': 'y',      'ß': 'ss',
      
      // Vowel length indicators (simplified approach)
      'aa': 'aː',     'ee': 'eː',     'oo': 'oː',    'uu': 'uː',
      'ie': 'iː',     'ah': 'aː',     'eh': 'eː',    'oh': 'oː',
      'uh': 'uː',
      
      // Diphthongs
      'ei': 'aɪ',     'ai': 'aɪ',     'au': 'aʊ',    'eu': 'ɔʏ',   'äu': 'ɔʏ',
      
      // Common consonant mappings
      'ch': 'ç',      'th': 't',      'ph': 'f',     'rh': 'r',
      'gh': 'g',      'sh': 'ʃ'
    };

    // Simple letter-to-phoneme fallback mapping
    this.letterToPhoneme = {
      'a': 'a', 'b': 'b', 'c': 'k', 'd': 'd', 'e': 'ɛ', 'f': 'f', 'g': 'g',
      'h': 'h', 'i': 'ɪ', 'j': 'j', 'k': 'k', 'l': 'l', 'm': 'm', 'n': 'n',
      'o': 'ɔ', 'p': 'p', 'q': 'k', 'r': 'ʁ', 's': 's', 't': 't', 'u': 'ʊ',
      'v': 'f', 'w': 'v', 'x': 'ks', 'y': 'ʏ', 'z': 'ts',
      'ä': 'ɛ', 'ö': 'ø', 'ü': 'y', 'ß': 'ss'
    };

    // Viseme durations in relative units (1=average)
    // Based on German phonetic research with additions for CH viseme
    this.visemeDurations = {
      'aa': 0.95, 'E': 0.90, 'I': 0.92, 'O': 0.96, 'U': 0.95,
      'PP': 1.08, 'SS': 1.23, 'DD': 1.05, 'FF': 1.00, 'kk': 1.21,
      'nn': 0.88, 'RR': 0.88, 'CH': 1.15, 'sil': 1
    };

    // Pauses in relative units (1=average)
    this.specialDurations = { ' ': 1, ',': 3, '.': 4, '!': 4, '?': 4, ';': 2, ':': 2, '-': 0.5, "'": 0.3 };

    // German number words (basic set)
    this.ones = ['null', 'eins', 'zwei', 'drei', 'vier', 'fünf', 'sechs', 'sieben', 'acht', 'neun'];
    this.teens = ['zehn', 'elf', 'zwölf', 'dreizehn', 'vierzehn', 'fünfzehn', 'sechzehn', 'siebzehn', 'achtzehn', 'neunzehn'];
    this.tens = ['', '', 'zwanzig', 'dreißig', 'vierzig', 'fünfzig', 'sechzig', 'siebzig', 'achtzig', 'neunzig'];

    // German symbols to words
    this.symbols = {
      '%': 'Prozent', '€': 'Euro', '&': 'und', '+': 'plus', '$': 'Dollar',
      '=': 'gleich', '@': 'at', '#': 'Hashtag', '*': 'Stern'
    };
    this.symbolsReg = /[%€&\+\$=@#\*]/g;
  }

  /**
  * Convert number to German words (simplified implementation)
  * @param {string|number} num Number to convert
  * @return {string} German words
  */
  numberToGermanWords(num) {
    const n = parseInt(num);
    if (isNaN(n)) return num.toString();
    
    if (n === 0) return "null";
    if (n < 0) return "minus " + this.numberToGermanWords(Math.abs(n));
    
    if (n < 10) return this.ones[n];
    if (n < 20) return this.teens[n - 10];
    if (n < 100) {
      const tens = Math.floor(n / 10);
      const ones = n % 10;
      return (ones > 0 ? this.ones[ones] + "und" : "") + this.tens[tens];
    }
    if (n < 1000) {
      const hundreds = Math.floor(n / 100);
      const remainder = n % 100;
      return this.ones[hundreds] + "hundert" + (remainder > 0 ? this.numberToGermanWords(remainder) : "");
    }
    if (n < 1000000) {
      const thousands = Math.floor(n / 1000);
      const remainder = n % 1000;
      return this.numberToGermanWords(thousands) + "tausend" + (remainder > 0 ? this.numberToGermanWords(remainder) : "");
    }
    
    // For larger numbers, fall back to digit-by-digit
    return [...num.toString()].map(digit => this.ones[parseInt(digit)]).join(" ");
  }

  /**
  * Preprocess text: convert symbols, numbers, normalize
  * @param {string} s Text to preprocess
  * @return {string} Preprocessed text
  */
  preProcessText(s) {
    let r = s
      // Handle German-specific characters and symbols
      .replace(this.symbolsReg, (symbol) => ' ' + this.symbols[symbol] + ' ')
      
      // German decimal notation (comma not period)
      .replace(/(\d+),(\d+)/g, '$1 Komma $2')
      
      // Convert numbers to German words
      .replace(/\d+/g, this.numberToGermanWords.bind(this))
      
      // Remove unwanted characters
      .replace(/[#_*"":;]/g, '')
      
      // Limit character repetition (max 2)
      .replace(/(\D)\1\1+/g, "$1$1")
      
      // Normalize spacing
      .replace(/\s+/g, ' ')
      
      // Remove non-German diacritics while preserving umlauts
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .normalize('NFC')
      .trim();

    return r;
  }

  /**
  * Add viseme to output, handling consecutive identical visemes
  * @param {Object} output Output object
  * @param {string} viseme Viseme to add
  * @param {number} currentTime Current time position
  * @return {number} Updated time position
  */
  addViseme(output, viseme, currentTime) {
    if (output.visemes.length && output.visemes[output.visemes.length - 1] === viseme) {
      // Extend duration for consecutive identical visemes (70% overlap)
      const extensionDuration = 0.7 * (this.visemeDurations[viseme] || 1);
      output.durations[output.durations.length - 1] += extensionDuration;
      return currentTime + extensionDuration;
    } else {
      // Add new viseme
      const duration = this.visemeDurations[viseme] || 1;
      output.visemes.push(viseme);
      output.times.push(currentTime);
      output.durations.push(duration);
      return currentTime + duration;
    }
  }

  /**
  * Convert text to Oculus LipSync Visemes and durations
  * @param {string} text Text to convert
  * @return {Object} Oculus LipSync Visemes and durations
  */
  wordsToVisemes(text) {
    let output = { words: text, visemes: [], times: [], durations: [] };
    let currentTime = 0;

    if (!text || text.trim().length === 0) return output;

    // Convert to lowercase for processing
    let processedText = text.toLowerCase();

    // Pass 1: Apply German pattern rules (longest patterns first)
    const patterns = Object.keys(this.letterRules).sort((a, b) => b.length - a.length);
    
    for (const pattern of patterns) {
      const phoneme = this.letterRules[pattern];
      // Use boundary markers to separate phonemes
      processedText = processedText.replaceAll(pattern, `|${phoneme}|`);
    }

    // Pass 2: Process segments
    const segments = processedText.split('|').filter(s => s.length > 0);
    
    for (const segment of segments) {
      if (this.phonemeToViseme[segment]) {
        // Direct phoneme-to-viseme mapping (preferred)
        const visemeSequence = this.phonemeToViseme[segment].split(' ');
        for (const viseme of visemeSequence) {
          currentTime = this.addViseme(output, viseme, currentTime);
        }
      } else {
        // Character-by-character processing
        for (const char of segment) {
          if (this.letterToPhoneme[char]) {
            const phoneme = this.letterToPhoneme[char];
            const viseme = this.phonemeToViseme[phoneme];
            if (viseme) {
              currentTime = this.addViseme(output, viseme, currentTime);
            }
          } else if (this.specialDurations[char] !== undefined) {
            // Handle spaces and punctuation
            currentTime += this.specialDurations[char];
          }
        }
      }
    }

    return output;
  }
}

export { LipsyncDe };