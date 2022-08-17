import classnames, {
  display,
  flexDirection,
  fontSize,
  fontWeight,
  height,
  inset,
  margin,
  position,
  textAlign,
} from 'tailwindcss-classnames'

/**
 * Layout
 */
export const mobileMenuContainer = classnames(
  position('fixed'),
  inset('top-0', 'left-0'),
  textAlign('text-center'),
  margin('m-6', 'mt-12')
)
export const menuContainer = classnames(display('flex'), flexDirection('flex-col'), height('h-screen'), margin('mr-10'))
export const logo = classnames(fontWeight('font-bold'), fontSize('text-4xl'), margin('mb-5'))
export const container = classnames(margin('m-10'))
export const main = classnames(display('flex'))

/**
 * Home
 */
export const homeContainer = classnames(margin('mt-36', 'md:mt-0'))
