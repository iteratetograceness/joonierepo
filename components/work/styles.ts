import classnames, { display, flexDirection, gap, inset, position, textAlign, width } from 'tailwindcss-classnames'

export const imageContainer = classnames(
  display('block'),
  gap('gap-7'),
  position('absolute'),
  inset('left-padding', 'top-44', 'md:top-48'),
  width('w-screen')
)

export const heading = classnames(textAlign('text-center'), inset('top-16'))

export const article = classnames(position('relative'), display('flex'), flexDirection('flex-col'))
