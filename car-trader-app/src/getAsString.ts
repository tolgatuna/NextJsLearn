export function getAsString(val: string | string[]): string {
    if (Array.isArray(val)) {
        return val[0];
    }
    return val;
}
