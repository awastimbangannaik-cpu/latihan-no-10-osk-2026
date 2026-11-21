import type { PhysicsQuestion, Vec2 } from '../types/physics';

export interface SimSample {
  pos: Vec2;
  cumulativeWork: number;
  displacementSoFar: Vec2;
  tangentDir: Vec2;
}

/**
 * Evaluates exact particle position and cumulative work W(u) for progress u in [0, 1].
 * Guaranteed to match the physical path and final exactAnswer of each question.
 */
export function evaluateSimulationAtProgress(question: PhysicsQuestion, uRaw: number): SimSample {
  const u = Math.max(0, Math.min(1, uRaw));
  const { diagram } = question;
  const { r1, r2, pathType } = diagram;

  let pos: Vec2 = { x: r1.x + (r2.x - r1.x) * u, y: r1.y + (r2.y - r1.y) * u };
  let tangentDir: Vec2 = { x: r2.x - r1.x, y: r2.y - r1.y };
  let cumulativeWork = question.exactAnswer * u;

  if (pathType === 'semicircle' && diagram.circleCenter && diagram.circleRadius) {
    // Soal 7: A(-5,0) -> top(0,5) -> B(5,0), angle from pi down to 0
    const angle = Math.PI * (1 - u);
    const cx = diagram.circleCenter.x;
    const cy = diagram.circleCenter.y;
    const R = diagram.circleRadius;
    pos = { x: cx + R * Math.cos(angle), y: cy + R * Math.sin(angle) };
    tangentDir = { x: Math.sin(angle), y: -Math.cos(angle) };
    // W_wind(u) = Fx * (x(u) - x_A) + Fy * (y(u) - y_A)
    const fx = diagram.primaryForce?.x ?? 0;
    const fy = diagram.primaryForce?.y ?? 0;
    cumulativeWork = fx * (pos.x - r1.x) + fy * (pos.y - r1.y);
  } else if (pathType === 'segmented' && diagram.viaPoints && diagram.viaPoints.length > 0) {
    // Two-segment orthogonal path P -> Q -> R (Soal 9, Soal 11)
    const qPt = diagram.viaPoints[0];
    const d1 = Math.hypot(qPt.x - r1.x, qPt.y - r1.y);
    const d2 = Math.hypot(r2.x - qPt.x, r2.y - qPt.y);
    const total = d1 + d2 || 1;
    const split = d1 / total;

    if (u <= split) {
      const localU = split > 0 ? u / split : 0;
      pos = { x: r1.x + (qPt.x - r1.x) * localU, y: r1.y + (qPt.y - r1.y) * localU };
      tangentDir = { x: qPt.x - r1.x, y: qPt.y - r1.y };
      if (question.id === 9) {
        // Soal 9: W_F = 8*dx + 4*dy, W_f = -5*s_so_far
        cumulativeWork = 8 * (pos.x - r1.x) + 4 * (pos.y - r1.y) - 5 * d1 * localU;
      } else if (question.id === 11) {
        // Soal 11: Phi(x,y) - Phi(1,2), Phi = x^2 + xy - y^3
        const phi = pos.x * pos.x + pos.x * pos.y - pos.y * pos.y * pos.y;
        cumulativeWork = phi - -5;
      }
    } else {
      const localU = 1 - split > 0 ? (u - split) / (1 - split) : 1;
      pos = { x: qPt.x + (r2.x - qPt.x) * localU, y: qPt.y + (r2.y - qPt.y) * localU };
      tangentDir = { x: r2.x - qPt.x, y: r2.y - qPt.y };
      if (question.id === 9) {
        cumulativeWork = 8 * (pos.x - r1.x) + 4 * (pos.y - r1.y) - 5 * (d1 + d2 * localU);
      } else if (question.id === 11) {
        const phi = pos.x * pos.x + pos.x * pos.y - pos.y * pos.y * pos.y;
        cumulativeWork = phi - -5;
      }
    }
  } else if (pathType === 'parabola') {
    // Soal 12: y = 0.5 x^2, x in [0, 1.8]
    const x = r1.x + (r2.x - r1.x) * u;
    const y = 0.5 * x * x;
    pos = { x, y };
    tangentDir = { x: 1, y: x };
    cumulativeWork = 0.5 * Math.pow(x, 3) + 0.5 * Math.pow(x, 4);
  } else if (pathType === 'circle' && diagram.circleCenter && diagram.circleRadius) {
    // Soal 13: C(1,2), R=2.8, A at angle 0, B at atan2(4,3) ≈ 0.9273 rad
    const angleEnd = Math.atan2(4, 3);
    const angle = angleEnd * u;
    const cx = diagram.circleCenter.x;
    const cy = diagram.circleCenter.y;
    const R = diagram.circleRadius;
    pos = { x: cx + R * Math.cos(angle), y: cy + R * Math.sin(angle) };
    tangentDir = { x: -Math.sin(angle), y: Math.cos(angle) };
    cumulativeWork = 6 * (pos.x - r1.x) + 8 * (pos.y - r1.y);
  } else if (pathType === 'spring') {
    // Soal 14: r1=(3,0), r2=(3,4), k=40, l0=1, F_ext=(5,12)
    pos = { x: r1.x + (r2.x - r1.x) * u, y: r1.y + (r2.y - r1.y) * u };
    tangentDir = { x: 0, y: 1 };
    const rMag = Math.hypot(pos.x, pos.y);
    const dx1 = 3.0 - 1.0;
    const dxNow = rMag - 1.0;
    const wExt = 5 * (pos.x - r1.x) + 12 * (pos.y - r1.y);
    const wSpring = 0.5 * 40 * (dx1 * dx1 - dxNow * dxNow);
    cumulativeWork = wExt + wSpring;
  } else if (pathType === 'parametric') {
    // Soal 15: r(t) = (2t, 1.5t^2 - t) for t in [0, 2]
    const t = 2.0 * u;
    pos = { x: 2.0 * t, y: 1.5 * t * t - 1.0 * t };
    tangentDir = { x: 2.0, y: 3.0 * t - 1.0 };
    // W_utama = F_utama · (r(t) - r(0)) where F_utama = (4, 1.5)
    cumulativeWork = 4.0 * pos.x + 1.5 * pos.y;
  } else {
    // Linear constant-force problems (Soal 1, 2, 3, 4, 5, 6, 8, 10)
    cumulativeWork = question.exactAnswer * u;
  }

  return {
    pos,
    cumulativeWork,
    displacementSoFar: { x: pos.x - r1.x, y: pos.y - r1.y },
    tangentDir,
  };
}
