import {
  classnames,
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
  screenReaders,
  borderRadius,
  content,
  TTailwindString,
  overflow,
} from 'tailwindcss-classnames'

/**
 * Main Layout
 */

export const skipToMainContent = classnames(
  width('w-fit'),
  screenReaders('sr-only', 'focus:not-sr-only'),
  position('focus:absolute'),
  inset('focus:top-auto', 'focus:left-auto'),
  textAlign('focus:text-center'),
  backgroundColor('bg-black', 'dark:bg-white'),
  textColor('text-white', 'dark:text-black'),
  padding('focus:px-5', 'focus:py-3'),
  zIndex('focus:z-50'),
  borderRadius('rounded-3xl'),
  fontWeight('font-medium')
)

export const themeButton = classnames(
  position('fixed'),
  zIndex('z-30'),
  inset('right-3', 'bottom-3'),
  padding('p-5', 'md:p-7'),
  width('w-fit')
)

export const outerThemeIcon = classnames(
  width('w-36'),
  height('h-36'),
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
  margin('mb-16'),
  fontSize('text-4xl'),
  fontFamily('font-sans')
)

const link = classnames(
  content(
    "after:hover:content-['*']" as TTailwindString,
    "after:focus:content-['*']" as TTailwindString,
    "after:active:content-['*']" as TTailwindString
  ),
  position('after:absolute', 'relative'),
  fontSize('after:text-3xl'),
  fontWeight('after:font-normal')
)

export const linkItem = classnames(
  link,
  fontStyle('hover:italic', 'focus:italic', 'active:italic'),
  inset('after:top-[-15px]' as TTailwindString, 'after:right-[-10px]' as TTailwindString)
)

export const mobileButton = classnames(
  link,
  inset('after:top-[-20px]' as TTailwindString, 'after:right-[-10px]' as TTailwindString)
)

export const underline = classnames(
  display('block'),
  position('absolute'),
  inset('left-10'),
  width('w-sans-padding'),
  height('h-px'),
  margin('m-auto'),
  backgroundColor('bg-black', 'dark:bg-white')
)

export const navLine = classnames(inset('top-28'))

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
    height('h-screen'),
    overflow('overflow-y-scroll')
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
    padding('p-7'),
    width('w-screen')
  )

export const circle = classnames(
  position('absolute'),
  width('min-w-[145px]' as TTailwindString, 'w-[125%]' as TTailwindString),
  margin('m-3'),
  inset('top-[-60%]' as TTailwindString, 'left-[-35px]' as TTailwindString)
)

/**
 * Button/Link
 */
const solidBg = classnames(backgroundColor('bg-black', 'dark:bg-white'))
const outlineBg = classnames(backgroundColor('bg-white', 'dark:bg-black'))
export const button = (isSolid: boolean) =>
  classnames(
    padding('p-3', 'px-7'),
    backgroundColor({
      [solidBg]: isSolid,
      [outlineBg]: !isSolid,
    }),
    borderColor({
      'border-black': !isSolid,
      'dark:border-white': !isSolid,
    }),
    borderWidth('!border-1'),
    width('w-fit'),
    textColor({
      'text-black': !isSolid,
      'dark:text-white': !isSolid,
      'text-white': isSolid,
      'dark:text-black': isSolid,
    }),
    borderRadius('rounded-3xl')
  )
