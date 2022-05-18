import {
  // backgroundColor,
  borderRadius,
  classnames,
  margin,
  minHeight,
  height,
  inset,
  position,
  width,
  padding,
  borderWidth,
  borderColor,
  zIndex,
} from 'tailwindcss-classnames'

/**
 * Main Layout
 */
export const themeButton = classnames(
  position('absolute'),
  zIndex('!z-50'),
  inset('right-0', 'bottom-0'),
  borderRadius('rounded-full'),
  borderWidth('border'),
  borderColor('border-black', 'dark:border-white'),
  width('w-40'),
  height('h-40'),
  padding('p-4'),
  margin('m-4')
  // backgroundColor('bg-black', 'dark:bg-white')
)
export const main = classnames(position('relative'), width('!w-screen'), minHeight('!min-h-screen'))
