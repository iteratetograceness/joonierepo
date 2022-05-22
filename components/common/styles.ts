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

const navigation = classnames(
  display('flex'),
  justifyContent('justify-between'),
  width('w-screen'),
  padding('p-10'),
  fontSize('text-4xl'),
  fontFamily('font-sans')
)
export const navContainer = classnames(navigation, fontWeight('font-medium'))
export const mobileNav = classnames(navigation, fontWeight('font-bold'))
export const logo = classnames(userSelect('select-none'))
export const menuButton = classnames(width('w-12'), height('h-min'), cursor('cursor-pointer'))
