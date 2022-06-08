import classnames, {
  display,
  flexDirection,
  gap,
  inset,
  position,
  screenReaders,
  textAlign,
  width,
} from 'tailwindcss-classnames'

export const imageContainer = classnames(
  display('block'),
  gap('gap-7'),
  position('absolute'),
  inset('left-padding', 'top-52', 'md:top-60'),
  width('w-screen')
)

export const imgCaption = classnames(screenReaders('sr-only'))

export const heading = classnames(textAlign('text-center'), inset('top-16'))

export const article = classnames(position('relative'), display('flex'), flexDirection('flex-col'))
