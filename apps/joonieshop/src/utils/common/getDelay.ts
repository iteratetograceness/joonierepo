export const getAnimationDelay = (i: number, d = 100) => {
    const delay = i * d;
    return {
        0: 'animation-delay-0',
        50: 'animation-delay-[50ms]',
        100: 'animation-delay-100',
        150: 'animation-delay-[150ms]',
        200: 'animation-delay-200',
        250: 'animation-delay-[50ms]',
        300: 'animation-delay-300',
        350: 'animation-delay-[350ms]',
        400: 'animation-delay-400',
        450: 'animation-delay-[450ms]',
        500: 'animation-delay-500',
        550: 'animation-delay-[550ms]',
    }[delay]
}