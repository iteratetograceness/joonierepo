import classnames, {
  display,
  flexDirection,
  gap,
  gridAutoFlow,
  gridColumn,
  gridTemplateColumns,
  height,
  inset,
  position,
  textAlign,
  width,
} from 'tailwindcss-classnames'

export const imageContainer = classnames(
  display('grid'),
  gridAutoFlow('grid-flow-col'),
  // gridTemplateColumns('grid-cols-3'),
  gap('gap-7'),
  position('absolute'),
  inset('left-padding', 'top-44'),
  width('w-screen'),
  height('h-96', 'lg:h-img-container')
)

export const leftImage = classnames(display('block'), position('relative'))
export const rightImage = classnames(display('block'), position('relative'))

export const heading = classnames(textAlign('text-center'), inset('top-16'))

export const article = classnames(position('relative'), display('flex'), flexDirection('flex-col'))
