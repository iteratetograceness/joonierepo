import classnames, { display, flexDirection, height, inset, position, textAlign, width } from 'tailwindcss-classnames'

export const imageContainer = classnames(
  display('flex'),
  position('absolute'),
  inset('left-padding', 'top-44'),
  width('w-screen'),
  height('h-img-container')
)

export const leftImage = classnames(position('relative'), width('w-3/5'), height('h-full'))
export const rightImage = classnames(position('relative'), width('w-2/5'), height('h-full'))

export const heading = classnames(textAlign('text-center'), inset('top-16'))

export const article = classnames(position('relative'), display('flex'), flexDirection('flex-col'))
