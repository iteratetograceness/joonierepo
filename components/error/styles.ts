import classnames, {
  alignItems,
  alignSelf,
  animation,
  backgroundColor,
  borderColor,
  borderRadius,
  borderWidth,
  content,
  display,
  flexDirection,
  fontSize,
  fontWeight,
  height,
  inset,
  justifyContent,
  letterSpacing,
  margin,
  padding,
  position,
  textAlign,
  textColor,
  TTailwindString,
  width,
  zIndex,
} from 'tailwindcss-classnames'

export const homeLink = classnames(
  alignSelf('self-center'),
  margin('mb-10'),
  letterSpacing('tracking-widest'),
  content('before:content-["←"]' as TTailwindString),
  animation('animate-bounce-left')
)

export const statusCode = classnames(
  position('absolute'),
  fontSize('text-6xl', 'md:text-8xl'),
  fontWeight('font-bold'),
  zIndex('z-[-10]' as TTailwindString),
  textColor('text-white')
)

export const statusCodeTopRight = classnames(statusCode, inset('top-0', 'left-26', 'md:left-32'))
export const statusCodeBottomLeft = classnames(
  statusCode,
  inset('bottom-0', 'right-26', 'md:right-32'),
  textColor('text-transparent')
)

export const statusMsg = classnames(
  fontSize('sm:text-lg', 'md:text-xl'),
  textAlign('text-center'),
  fontWeight('font-thin')
)
export const oval = classnames(
  position('relative'),
  borderRadius('rounded-[60%]' as TTailwindString),
  borderColor('border-black', 'dark:border-white'),
  borderWidth('border-1'),
  width('w-min'),
  padding('p-10'),
  backgroundColor('bg-white', 'dark:bg-black')
)
export const errorContainer = classnames(
  display('flex'),
  flexDirection('flex-col'),
  justifyContent('justify-center'),
  alignItems('items-center'),
  height('h-mobile-screen', 'md:h-sans-padding')
)
