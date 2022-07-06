import classnames, {
  fontSize,
  textAlign,
  fontWeight,
  margin,
  flexDirection,
  display,
  borderRadius,
  justifyContent,
  borderColor,
  borderWidth,
  padding,
  gap,
  position,
  height,
  alignItems,
  width,
  zIndex,
} from 'tailwindcss-classnames'

/**
 * Big Heading
 */

export const title = classnames(
  fontSize('text-5xl', 'md:text-7xl'),
  textAlign('text-center'),
  fontWeight('font-normal')
)

export const subtitle = classnames(
  fontWeight('font-thin'),
  textAlign('text-center'),
  fontSize('text-xs', 'md:text-sm'),
  margin('mb-4')
)

export const titleContainer = classnames(display('flex'), flexDirection('flex-col-reverse'), margin('mt-8'))

/**
 * Tags
 */

export const tagContainer = classnames(display('flex'), justifyContent('justify-center'), margin('mt-4', 'mb-8'))
export const tag = classnames(
  fontSize('text-xs'),
  borderRadius('rounded-3xl'),
  padding('px-4', 'py-1'),
  margin('mx-2'),
  borderColor('border-inherit'),
  borderWidth('border-1')
)

/**
 * Grid
 */

export const grid = classnames(display('flex'), flexDirection('flex-col'), gap('gap-9'), margin('mt-20'))

/**
 * Card
 */
export const cardContainer = classnames(
  position('relative'),
  display('flex'),
  alignItems('items-center'),
  borderColor('border-b-white'),
  borderWidth('border-b-1'),
  margin('my-5'),
  padding('pb-10')
)
export const image = classnames(
  position('absolute'),
  width('w-64', 'md:!w-96'),
  height('h-64', 'md:!h-96'),
  zIndex('z-10')
)
export const cardText = classnames(padding('p-7'))
