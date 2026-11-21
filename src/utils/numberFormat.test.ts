import test from 'node:test';
import assert from 'node:assert/strict';
import {
  roundToOneDecimal,
  formatIndoDecimal,
  parseIndonesianOneDecimalInput,
  evaluateNumericAnswer,
} from './numberFormat';
import { sanitizePhysicsTextForSpeech } from './ttsNarrator';

test('roundToOneDecimal rounds half away from zero accurately', () => {
  assert.equal(roundToOneDecimal(12.456), 12.5);
  assert.equal(roundToOneDecimal(12.44), 12.4);
  assert.equal(roundToOneDecimal(12.45), 12.5);
  assert.equal(roundToOneDecimal(-3.55), -3.6);
  assert.equal(roundToOneDecimal(-0.001), 0);
  assert.equal(roundToOneDecimal(8.1648), 8.2);
});

test('formatIndoDecimal formats numbers with comma and exactly 1 decimal', () => {
  assert.equal(formatIndoDecimal(29), '29,0');
  assert.equal(formatIndoDecimal(-22), '-22,0');
  assert.equal(formatIndoDecimal(43.30127), '43,3');
  assert.equal(formatIndoDecimal(5.36656), '5,4');
});

test('parseIndonesianOneDecimalInput enforces strict comma 1-decimal format', () => {
  // Valid inputs
  assert.deepEqual(parseIndonesianOneDecimalInput('12,4'), {
    valid: true,
    numericValue: 12.4,
    normalizedCommaString: '12,4',
    errorMessage: null,
  });
  assert.deepEqual(parseIndonesianOneDecimalInput('-17,0'), {
    valid: true,
    numericValue: -17,
    normalizedCommaString: '-17,0',
    errorMessage: null,
  });

  // Invalid: dot decimal
  const dotRes = parseIndonesianOneDecimalInput('12.4');
  assert.equal(dotRes.valid, false);
  assert.match(dotRes.errorMessage ?? '', /koma/i);

  // Invalid: no decimal digit
  const intRes = parseIndonesianOneDecimalInput('29');
  assert.equal(intRes.valid, false);
  assert.match(intRes.errorMessage ?? '', /satu angka di belakang koma/i);

  // Invalid: two decimal digits
  const twoDecRes = parseIndonesianOneDecimalInput('12,45');
  assert.equal(twoDecRes.valid, false);
  assert.match(twoDecRes.errorMessage ?? '', /satu angka di belakang koma/i);
});

test('evaluateNumericAnswer grades answers accurately without leaking solution on wrong attempt', () => {
  const ok = evaluateNumericAnswer('43,3', 25 * Math.sqrt(3), 'Periksa sudut apit.');
  assert.equal(ok.isCorrect, true);
  assert.equal(ok.expectedFormatted, '43,3');

  const wrong = evaluateNumericAnswer('43,0', 25 * Math.sqrt(3), 'Periksa sudut apit.');
  assert.equal(wrong.isCorrect, false);
  assert.match(wrong.feedbackMessage, /Periksa sudut apit/);
  assert.equal(wrong.feedbackMessage.includes('43,3'), false);
});

test('sanitizePhysicsTextForSpeech converts LaTeX to natural Indonesian speech', () => {
  const spoken = sanitizePhysicsTextForSpeech(
    'Usaha $W = \\vec{F} \\cdot \\Delta\\vec{r} = (3\\hat{i} + 4\\hat{j}) \\cdot (1\\hat{i} - 5\\hat{j}) = -17,0$ Joule.'
  );
  assert.equal(spoken.includes('\\'), false);
  assert.equal(spoken.includes('$'), false);
  assert.match(spoken, /i topi/);
  assert.match(spoken, /j topi/);
  assert.match(spoken, /17 koma 0/);
});

test('independent physics verification of all 15 Olympiad problems', () => {
  // Soal 1: r1=(2,1), r2=(6,4), F=(5,3) -> dr=(4,3), W=20+9=29.0
  assert.equal(formatIndoDecimal(5 * (6 - 2) + 3 * (4 - 1)), '29,0');

  // Soal 2: r1=(1.5,4), r2=(3.5,-2.5), F=(2,4) -> dr=(2,-6.5), W=4-26=-22.0
  assert.equal(formatIndoDecimal(2 * (3.5 - 1.5) + 4 * (-2.5 - 4)), '-22,0');

  // Soal 3: r1=(-1,3), r2=(4,1), F=(6,Fy), W=19 -> 6*5 + Fy*(-2) = 19 -> Fy=5.5
  assert.equal(formatIndoDecimal((30 - 19) / 2), '5,5');

  // Soal 4: |dr|=5, |F|=10, theta=30 deg -> W=50*cos(30)=43.301... -> 43,3
  assert.equal(formatIndoDecimal(10 * Math.hypot(4, 3) * Math.cos(Math.PI / 6)), '43,3');

  // Soal 5: r1=(2,-1), r2=(5,3), F=(8,c), W=0 -> 8*3 + c*4=0 -> c=-6.0
  assert.equal(formatIndoDecimal((-8 * (5 - 2)) / (3 - -1)), '-6,0');

  // Soal 6: m=2.5, F1=(5,-1), F2=(-1,4), r1=(1,2), r2=(7,6) -> Fres=(4,3), dr=(6,4), W=36, v=sqrt(2*36/2.5)=5.3665 -> 5,4
  const w6 = (5 - 1) * (7 - 1) + (-1 + 4) * (6 - 2);
  assert.equal(formatIndoDecimal(Math.sqrt((2 * w6) / 2.5)), '5,4');

  // Soal 7: semicircle (-5,0) to (5,0), F=(3.2,-2.5) -> dr=(10,0), W=32.0
  assert.equal(formatIndoDecimal(3.2 * 10 + -2.5 * 0), '32,0');

  // Soal 8: m=2, g=10, r1=(0,0), r2=(4,3), F=(15,5) -> Wf=60+15=75, Wg=-20*3=-60, Wn=0 -> 15.0
  assert.equal(formatIndoDecimal(15 * 4 + 5 * 3 - 2 * 10 * 3), '15,0');

  // Soal 9: m=2, muk=0.25, g=10 -> fk=5; P(1,2)->Q(5,2)->R(5,5): s=4+3=7; dr=(4,3); F=(8,4) -> W=32+12 - 35 = 9.0
  assert.equal(formatIndoDecimal(8 * 4 + 4 * 3 - 0.25 * 2 * 10 * (4 + 3)), '9,0');

  // Soal 10: Ek1=25, r1=(1,2), r2=(2,-3), F=(3,4) -> W=3*1+4*(-5)=-17 -> Ek2=8.0
  assert.equal(formatIndoDecimal(25 + (3 * (2 - 1) + 4 * (-3 - 2))), '8,0');

  // Soal 11: conservative F=(2x+y, x-3y^2), U*=x^2+xy-y^3, (1,2)->(3,1): (9+3-1)-(1+2-8)=11-(-5)=16.0
  const u11 = (x: number, y: number) => x * x + x * y - y * y * y;
  assert.equal(formatIndoDecimal(u11(3, 1) - u11(1, 2)), '16,0');

  // Soal 12: y=0.5x^2, x:0->1.8, F=(3y, 2x^2) -> int_0^1.8 (1.5x^2 + 2x^3)dx = 0.5*1.8^3 + 0.5*1.8^4 = 8.1648 -> 8,2
  assert.equal(formatIndoDecimal(0.5 * 1.8 ** 3 + 0.5 * 1.8 ** 4), '8,2');

  // Soal 13: Circle C(1,2), R=2.8, A(3.8,2), F=(6,8) -> |F|=10, Wmax=10*2.8 - 6*2.8 = 11.2
  assert.equal(formatIndoDecimal(Math.hypot(6, 8) * 2.8 - 6 * 2.8), '11,2');

  // Soal 14: k=40, l0=1, r1=(3,0) [dx1=2], r2=(3,4) [r2=5, dx2=4], Fext=(5,12) -> Wext=48, Wspring=0.5*40*(4-16)=-240 -> -192.0
  assert.equal(formatIndoDecimal(12 * 4 + 0.5 * 40 * (2 ** 2 - 4 ** 2)), '-192,0');

  // Soal 15: m=1.5, r(t)=(2t, 1.5t^2-t), F0=(-4,3), t:0->2 -> v(0)=(2,-1), v(2)=(2,5), dEk=0.75*(29-5)=18, W0=-16+12=-4 -> Wutama=22.0
  const dEk = 0.5 * 1.5 * ((2 ** 2 + 5 ** 2) - (2 ** 2 + (-1) ** 2));
  const w0 = -4 * 4 + 3 * 4;
  assert.equal(formatIndoDecimal(dEk - w0), '22,0');
});

import { ALL_QUESTIONS } from '../data/questions';
import { evaluateSimulationAtProgress } from './physicsSimulation';

test('all 15 questions match formatting rules and simulation endpoints', () => {
  assert.equal(ALL_QUESTIONS.length, 15);
  for (const q of ALL_QUESTIONS) {
    assert.equal(formatIndoDecimal(q.exactAnswer), q.expectedFormatted);
    const endSample = evaluateSimulationAtProgress(q, 1.0);
    assert.ok(
      Math.abs(endSample.cumulativeWork - q.exactAnswer) < 1e-6,
      `Soal ${q.id} simulation endpoint (${endSample.cumulativeWork}) must match exactAnswer (${q.exactAnswer})`
    );
  }
});
