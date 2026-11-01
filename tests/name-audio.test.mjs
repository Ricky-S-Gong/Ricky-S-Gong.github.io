import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const source = readFileSync(new URL('../script.js', import.meta.url), 'utf8');
const player = source.slice(source.indexOf('let nameUtterance;'), source.indexOf('document.getElementById("home-intro-content").addEventListener'));
function setup(voices = [], lang = 'en', supported = true) {
  const status = { textContent: '' };
  const calls = [];
  const document = { documentElement: { lang }, getElementById: () => status };
  const window = supported ? {
    SpeechSynthesisUtterance: class { constructor(text) { this.text = text; } },
    speechSynthesis: { cancel: () => calls.push('cancel'), getVoices: () => voices, speak: utterance => calls.push(utterance) },
  } : {};
  const play = new Function('window', 'document', player + ';return playNameAudio;')(window, document);
  assert.equal(calls.length, 0, 'Never autoplay on initialization');
  return { play, status, calls };
}
const cn = { lang: 'zh-CN' }, tw = { lang: 'zh-TW' };
const page = setup([tw, cn]);
page.play();
assert.equal(page.calls[0], 'cancel');
const utterance = page.calls[1];
assert.equal(utterance.text, '宫商羽');
assert.equal(utterance.lang, 'zh-CN');
assert.equal(utterance.voice, cn);
assert(utterance.rate > 0 && utterance.rate < 1);
utterance.onerror({ error: 'interrupted' });
assert.equal(page.status.textContent, '');
utterance.onerror({ error: 'voice-unavailable' });
assert(page.status.textContent.includes('Unable to play'));
page.play();
assert.equal(page.status.textContent, '');
const delayed = setup(); delayed.play(); assert.equal(delayed.calls[1].lang, 'zh-CN');
const unavailable = setup([], 'zh-CN', false); unavailable.play(); assert(unavailable.status.textContent.includes('不支持'));
assert(!source.includes('shahng') && !source.includes('name-ipa'), 'Remove the text guide');
console.log('PASS: click-only Mandarin playback, preferred voice, replay, delayed voices, errors and unsupported browsers.');
