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
  backgroundColor,
  textColor,
  gridTemplateColumns,
  gap,
  position,
  height,
  minHeight,
  TTailwindString,
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

export const grid = classnames(
  display('grid'),
  gridTemplateColumns('grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3'),
  gap('gap-9')
)

/**
 * Card
 */
export const cardContainer = classnames(
  display('flex'),
  flexDirection('flex-col'),
  backgroundColor('bg-black', 'dark:bg-white'),
  textColor('text-white', 'dark:text-black'),
  borderRadius('rounded-3xl')
)
export const imgContainer = classnames(
  position('relative'),
  minHeight('lg:min-h-fit'),
  height('h-[250px]' as TTailwindString),
  borderRadius('rounded-b-3xl')
)
export const cardText = classnames(padding('p-7'))
