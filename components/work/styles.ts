import classnames, {
  display,
  flexDirection,
  gap,
  height,
  inset,
  position,
  textAlign,
  width,
} from 'tailwindcss-classnames'

export const imageContainer = classnames(
  display('block'),
  gap('gap-7'),
  position('absolute'),
  inset('left-padding', 'top-44'),
  width('w-screen'),
  height('h-img-container')
)

export const heading = classnames(textAlign('text-center'), inset('top-16'))

export const article = classnames(position('relative'), display('flex'), flexDirection('flex-col'))
