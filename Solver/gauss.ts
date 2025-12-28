import type { Interval, ElementaryPart } from "./types"

const FIRST_ROOT = -0.57735
const SECOND_ROOT = 0.57735
const WEIGHT = 1.0

const quadrature = (domain: Interval, func: ElementaryPart) => {
    const xi = (domain[1] - domain[0]) / 2
    const mid = (domain[1] + domain[0]) / 2
    return xi * (WEIGHT * func(xi * FIRST_ROOT + mid) + WEIGHT * func(xi * SECOND_ROOT + mid))

}

export { quadrature }