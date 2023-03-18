export const parsePrice = (amount?: number) => {
    if (!amount) return 0;
    const price = amount / 100;
    return price % 1 === 0 ? price.toFixed(0) : price.toFixed(2);
}