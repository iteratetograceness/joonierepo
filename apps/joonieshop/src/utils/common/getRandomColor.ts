const COLORS = ['bg-dark', 'bg-light', 'bg-light-blue', 'bg-yellow', 'bg-brown', 'bg-light-brown', 'bg-red', 'bg-dark-blue'];

export const getRandomColor = (exclude: string[] = []) => {
    const filtered = exclude.length > 0 ? COLORS.filter(color => !exclude?.includes(color)) : COLORS;
    return filtered[Math.floor(Math.random() * filtered.length)];
};