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
  listStyleType,
  textAlign,
  borderColor,
  borderWidth,
  fontStyle,
} from 'tailwindcss-classnames'

/**
 * Main Layout
 */

export const themeButton = classnames(
  position('fixed'),
  zIndex('z-30'),
  inset('right-3', 'bottom-12', 'md:bottom-3'),
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
  padding('p-10'),
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
  width('w-full'),
  // padding('p-10'),
  margin('mb-16'),
  fontSize('text-3xl', 'md:text-4xl'),
  fontFamily('font-sans')
)

export const linkItem = classnames(
  fontStyle('hover:italic', 'focus:italic', 'active:italic'),
  textColor('hover:text-green', 'focus:text-green', 'active:text-green')
)

export const mobileButton = classnames(fontStyle('hover:italic', 'focus:italic'), textColor('hover:text-green'))

export const underline = (isDarkMode: boolean) =>
  classnames(
    display('block'),
    position('absolute'),
    inset('top-28', 'left-10'),
    width('w-sans-padding'),
    height('h-px'),
    margin('m-auto'),
    backgroundColor({
      ['bg-white']: isDarkMode,
      ['bg-black']: !isDarkMode,
    })
  )

export const mobileNav = classnames(
  navigation,
  position('relative'),
  fontWeight('font-medium'),
  alignItems('items-center')
)
export const navContainer = classnames(navigation, fontWeight('font-medium'))
export const logo = classnames(mobileButton, userSelect('select-none'))

export const mobileMenu = (isDarkMode: boolean) =>
  classnames(
    display('flex'),
    flexDirection('flex-col'),
    alignItems('items-center'),
    textAlign('text-center'),
    inset('top-padding', 'left-padding'),
    zIndex('z-50'),
    backgroundColor({
      ['bg-white']: isDarkMode,
      ['bg-black']: !isDarkMode,
    }),
    textColor({
      ['text-black']: isDarkMode,
      ['text-white']: !isDarkMode,
    }),
    width('w-screen'),
    height('h-screen')
  )
export const mobileClose = classnames(alignSelf('self-end'), margin('mb-7'))
export const mobileLinks = classnames(listStyleType('list-none'))
export const mobileLinkItem = (isDarkMode: boolean) =>
  classnames(
    borderWidth('border-b'),
    borderColor({
      ['border-black']: isDarkMode,
      ['border-white']: !isDarkMode,
    }),
    padding('p-5'),
    width('w-screen')
  )
