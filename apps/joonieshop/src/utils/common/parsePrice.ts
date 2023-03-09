export const parsePrice = (amount?: number) => {
    if (!amount) return 0;
    return (amount / 100).toFixed(2);
}