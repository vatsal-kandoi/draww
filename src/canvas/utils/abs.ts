export default function abs(num: number): number {
    if (num < 0)
        return -1 * num;
    return num;
}