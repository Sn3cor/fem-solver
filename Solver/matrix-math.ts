import { type Matrix, type PLU, type Vector } from "./types"

// PLU Factorization
const luFact = (A: Matrix): PLU => {
  const n = A.length;
  const U: Matrix = A.map(row => [...row]);
  const L: Matrix = Array.from({ length: n }, (_, i) => Array(n).fill(0).map((_, j) => i === j ? 1 : 0));
  const P: Matrix = Array.from({ length: n }, (_, i) => Array(n).fill(0).map((_, j) => i === j ? 1 : 0));

  for (let i = 0; i < n; i++) {
    let maxRow = i;

    for (let k = i + 1; k < n; k++) {
      if (Math.abs(U[k][i]) > Math.abs(U[maxRow][i])) {
        maxRow = k;
      }
    }

    if (Math.abs(U[maxRow][i]) < 1e-12) throw new Error("Singularity")

    if (maxRow !== i) {
      // [A[i], A[maxRow]] = [A[maxRow], A[i]];
      [U[i], U[maxRow]] = [U[maxRow], U[i]];
      [P[i], P[maxRow]] = [P[maxRow], P[i]];

      for (let k = 0; k < i; k++) {
        [L[i][k], L[maxRow][k]] = [L[maxRow][k], L[i][k]];
      }
    }

    for (let j = i + 1; j < n; j++) {
      let factor = U[j][i] / U[i][i];
      L[j][i] = factor;

      for (let k = i; k < n; k++) {
        U[j][k] = U[j][k] - factor * U[i][k];
      }
    }
  }

  return [P, L, U]
};


const luSolve = (A: Matrix, B: Vector) => {
  const n = A.length;
  const [P, L, U] = luFact(A);
  console.log(P);
  console.log(L);
  console.log(U);
  const y: Vector = [...Array(n)].fill(0);

  // Apply P permutation matrix
  const PB: Vector = new Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (P[i][j] === 1) {
        PB[i] = B[j];
        break;
      }
    }
  }

  // Forward substitution
  for (let i = 0; i < n; i++) {
    let sum = 0;
    for (let j = 0; j < i; j++) {
      sum += y[j] * L[i][j];
    }
    y[i] = (PB[i] - sum) / L[i][i];

  }

  // Backward substitution
  const x: Vector = [...Array(n)].fill(0);

  for (let i = n - 1; i >= 0; i--) {
    let sum = 0;
    for (let j = i + 1; j < n; j++) {
      sum += x[j] * U[i][j];
    }
    x[i] = (y[i] - sum) / U[i][i];
  }

  return x;
}

export { luFact, luSolve };
