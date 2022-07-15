import classnames, {
  display,
  flexDirection,
  inset,
  justifyContent,
  margin,
  position,
  screenReaders,
  textAlign,
  width,
} from 'tailwindcss-classnames'

export const imageContainer = classnames(
  display('block'),
  position('relative'),
  inset('left-padding'),
  width('w-screen'),
  margin('my-2', 'mb-12')
)

export const imgCaption = classnames(screenReaders('sr-only'))

export const heading = classnames(textAlign('text-center'), inset('top-16'))

export const article = classnames(position('relative'), display('flex'), flexDirection('flex-col'))

export const content = classnames(display('flex'), justifyContent('justify-center'))
