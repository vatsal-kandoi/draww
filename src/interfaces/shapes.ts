interface IPoint {
    x: number,
    y: number
}

interface ILine {
    fromCoords: IPoint,
    toCoords: IPoint,
    color: string,
}

export type {IPoint, ILine};