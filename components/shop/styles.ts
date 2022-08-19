import classnames, {
  backgroundColor,
  borderWidth,
  display,
  flexDirection,
  fontSize,
  fontWeight,
  height,
  inset,
  margin,
  padding,
  position,
  textAlign,
  TTailwindString,
  width,
} from 'tailwindcss-classnames'

/**
 * Layout
 */
export const mobileMenuContainer = classnames(
  position('fixed'),
  inset('top-0', 'left-0'),
  textAlign('text-center'),
  margin('mt-12'),
  width('w-full')
)
export const mobileLinks = classnames(
  display('flex'),
  flexDirection('flex-col'),
  backgroundColor('bg-white', 'dark:bg-black'),
  margin('my-6')
)
export const mobileLink = classnames(
  borderWidth('border-t-1', 'last:border-b-1'),
  backgroundColor('hover:bg-black', 'hover:dark:bg-white' as TTailwindString), // animate
  padding('py-3')
)
export const menuContainer = classnames(display('flex'), flexDirection('flex-col'), height('h-screen'), margin('mr-10'))
export const logo = classnames(fontWeight('font-bold'), fontSize('text-4xl'), margin('mb-5'))
export const container = classnames(margin('m-10'))
export const main = classnames(display('flex'))

/**
 * Home
 */
