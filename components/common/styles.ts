import {
  classnames,
  margin,
  minHeight,
  height,
  inset,
  position,
  width,
  zIndex,
  transitionProperty,
  transitionTimingFunction,
  transitionDuration,
  display,
  padding,
  justifyContent,
  fontWeight,
  fontSize,
  fontFamily,
  userSelect,
  cursor,
  animation,
} from 'tailwindcss-classnames'

/**
 * Main Layout
 */

export const themeButton = classnames(
  position('absolute'),
  zIndex('!z-50'),
  inset('right-0', 'bottom-0'),
  margin('m-5', 'md:m-7'),
  width('w-fit')
)

export const outerThemeIcon = classnames(
  width('w-32'),
  height('h-32'),
  position('relative'),
  animation('motion-safe:animate-spin-slow')
)
export const innerThemeIcon = classnames(
  position('absolute'),
  inset('bottom-0', 'left-0'),
  width('w-fit'),
  height('h-fit')
)

export const main = classnames(
  position('relative'),
  width('!w-screen'),
  minHeight('!min-h-screen'),
  transitionProperty('transition-colors'),
  transitionTimingFunction('ease-in-out'),
  transitionDuration('duration-500')
)

/**
 * Navigation
 */

const spaceBetween = classnames(justifyContent('justify-between'))
const justifyCenter = classnames(justifyContent('justify-center'))

export const navContainer = (isLarge: boolean) =>
  classnames(
    display('flex'),
    width('w-screen'),
    padding('p-10'),
    justifyContent({
      [spaceBetween]: isLarge,
      [justifyCenter]: !isLarge,
    }),
    fontWeight('font-medium'),
    fontSize('text-4xl'),
    fontFamily('font-sans')
  )

export const innerNav = classnames(display('flex'), justifyContent('justify-between'), width('w-full'))
export const logo = classnames(fontWeight('font-bold'), userSelect('select-none'))
export const menuButton = classnames(width('w-12'), height('h-min'), cursor('cursor-pointer'))
