import { describe, it, expect } from 'vitest';

describe('Numerical Laboratory Metric Validations', () => {
  it('correctly calculates classification metrics on imbalanced clinical cases', () => {
    const tp = 45;
    const fp = 15;
    const fn = 5;
    const tn = 435;
    const total = tp + fp + fn + tn; // 500

    const accuracy = (tp + tn) / total;
    const precision = tp / (tp + fp);
    const recall = tp / (tp + fn);
    const specificity = tn / (tn + fp);
    const f1 = (2 * precision * recall) / (precision + recall);

    const mccDenom = Math.sqrt((tp + fp) * (tp + fn) * (tn + fp) * (tn + fn));
    const mcc = ((tp * tn) - (fp * fn)) / mccDenom;

    expect(total).toBe(500);
    expect(accuracy).toBe(0.96);
    expect(precision).toBe(0.75);
    expect(recall).toBe(0.90);
    expect(Number(specificity.toFixed(4))).toBe(0.9667);
    expect(Number(f1.toFixed(4))).toBe(0.8182);
    expect(Number(mcc.toFixed(4))).toBe(0.8001);
  });

  it('correctly calculates regression errors (MAE, MSE, RMSE, R2)', () => {
    const actuals = [24.5, 31.0, 42.8, 18.2, 55.4];
    const preds = [22.1, 33.5, 40.2, 19.8, 51.0];
    const n = actuals.length;

    let sumAbs = 0;
    let sumSq = 0;
    const meanActual = actuals.reduce((a, b) => a + b, 0) / n;
    let ssTot = 0;
    let ssRes = 0;

    for (let i = 0; i < n; i++) {
      const err = actuals[i] - preds[i];
      sumAbs += Math.abs(err);
      sumSq += err * err;
      ssTot += Math.pow(actuals[i] - meanActual, 2);
      ssRes += Math.pow(err, 2);
    }

    const mae = sumAbs / n;
    const mse = sumSq / n;
    const rmse = Math.sqrt(mse);
    const r2 = 1 - (ssRes / ssTot);

    expect(Number(mae.toFixed(2))).toBe(2.70);
    expect(Number(mse.toFixed(2))).toBe(8.14);
    expect(Number(rmse.toFixed(2))).toBe(2.85);
    expect(Number(r2.toFixed(3))).toBe(0.954);
  });
});
