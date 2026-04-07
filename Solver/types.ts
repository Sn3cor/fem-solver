type Interval = [number, number];
type ElementaryPart = (x: number) => number;
type Elementary = [ElementaryPart, ElementaryPart];
type Matrix = number[][];
type Vector = number[];
type PLU = [Matrix, Matrix, Matrix]
export type { Interval, Elementary, ElementaryPart, Matrix, Vector, PLU };
