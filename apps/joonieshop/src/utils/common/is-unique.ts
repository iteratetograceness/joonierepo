export const isUnique = <T>(value: T, index: number, arr: T[]): boolean => {
	return arr.indexOf(value) === index;
};
