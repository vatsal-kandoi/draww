import { Point } from "../../interfaces";
import abs from "../numeric/abs";

export function shift(point: Point, from_center: Point, to_center: Point): Point {
    const ratio = abs((from_center.y - point.y) / (from_center.x - point.x));
    const distance = Math.sqrt(Math.pow( from_center.y - point.y, 2) +  Math.pow(from_center.x - point.x, 2))
    const c = distance / Math.sqrt( ( Math.pow(ratio, 2) + 1 ))

    const multiplier = {
        x: point.x < from_center.x ? -1 : 1,
        y: point.y < from_center.y ? -1 : 1,
    }

    return {
        x: to_center.x + multiplier.x * c,
        y: to_center.y + multiplier.y * ratio * c
    }
}