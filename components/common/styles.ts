import {
  classnames,
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
  animation,
  backgroundColor,
  alignItems,
  margin,
  alignSelf,
  flexDirection,
  textColor,
} from 'tailwindcss-classnames'

/**
 * Main Layout
 */

export const themeButton = classnames(
  position('absolute'),
  zIndex('!z-50'),
  inset('right-3', 'bottom-3'),
  padding('p-5', 'md:p-7'),
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

const bottomBorderWhite = classnames(backgroundColor('bg-white'))
const bottomBorderBlack = classnames(backgroundColor('bg-black'))
export const underline = (isDarkMode: boolean) =>
  classnames(
    display('block'),
    position('absolute'),
    inset('top-26', 'left-10'),
    width('w-underline'),
    height('h-px'),
    margin('m-auto'),
    padding('px-10'),
    backgroundColor({
      [bottomBorderWhite]: isDarkMode,
      [bottomBorderBlack]: !isDarkMode,
    })
  )

export const mobileNav = classnames(
  navigation,
  position('relative'),
  fontWeight('font-medium'),
  alignItems('items-center')
)
export const navContainer = classnames(navigation, fontWeight('font-medium'))
export const logo = classnames(userSelect('select-none'))
// export const menuButton = classnames(width('w-10'), height('h-min'), cursor('cursor-pointer'))

export const mobileMenu = (isDarkMode: boolean) =>
  classnames(
    display('flex'),
    flexDirection('flex-col'),
    position('absolute'),
    inset('top-0', 'left-0'),
    padding('p-16'),
    backgroundColor({
      ['bg-white']: isDarkMode,
      ['bg-black']: !isDarkMode,
    }),
    textColor({
      ['text-black']: isDarkMode,
      ['text-white']: !isDarkMode,
    }),
    width('w-screen'),
    zIndex('-z-50')
  )
export const mobileClose = classnames(alignSelf('self-end'))
