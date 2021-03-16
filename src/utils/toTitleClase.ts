export function toTitleCase(str: string) {
    const arr = str.split(' ');
    arr.map((word, index) => arr[index] = word[0] + word.slice(1));
    return arr.join(' ');
}