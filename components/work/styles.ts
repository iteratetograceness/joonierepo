import classnames, {
  display,
  flexDirection,
  gap,
  inset,
  margin,
  position,
  screenReaders,
  textAlign,
  width,
} from 'tailwindcss-classnames'

export const imageContainer = classnames(
  display('block'),
  gap('gap-7'),
  position('relative'),
  inset('left-padding'),
  width('w-screen'),
  margin('my-2', 'mb-12')
)

export const imgCaption = classnames(screenReaders('sr-only'))

export const heading = classnames(textAlign('text-center'), inset('top-16'))

export const article = classnames(position('relative'), display('flex'), flexDirection('flex-col'))

export const markdown =
  'color-black dark:color-white text-md prose-h3:text-lg prose-h3:font-medium prose-headings:mt-9 prose-headings:mb-3 !max-w-prose prose-p:mb-2 leading-relaxed'
