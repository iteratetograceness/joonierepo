import classnames, {
  alignItems,
  backgroundColor,
  borderRadius,
  display,
  fill,
  flexDirection,
  fontSize,
  fontStyle,
  fontWeight,
  gap,
  gridTemplateColumns,
  height,
  justifyContent,
  letterSpacing,
  lineHeight,
  margin,
  opacity,
  overflow,
  padding,
  position,
  textAlign,
  textColor,
  transformOrigin,
  TTailwindString,
  width,
} from 'tailwindcss-classnames'

export const nameContainer = classnames(margin('mb-14'))

export const name = classnames(
  fontSize(
    'text-[10vw]' as TTailwindString,
    'sm:text-[10.8vw]' as TTailwindString,
    'md:text-[11.5vw]' as TTailwindString,
    'lg:text-[11.9vw]' as TTailwindString
  ),
  textAlign('text-center'),
  fontWeight('font-bold'),
  margin('mt-0'),
  lineHeight('leading-none'),
  letterSpacing('tracking-tighter')
)

export const leftOfImage = classnames(
  display('flex'),
  justifyContent('justify-center'),
  alignItems('items-center'),
  borderRadius('rounded-full', 'lg:rounded-full'),
  backgroundColor('bg-black', 'dark:bg-white'),
  textColor('text-white', 'dark:text-black'),
  padding('p-8'),
  margin('mb-2', 'lg:mb-0')
)

export const svg = classnames(display('hidden', 'lg:block'))
export const curvedText = classnames(
  fontSize('text-6xl'),
  fontWeight('font-bold'),
  fill('fill-white', 'dark:fill-black')
)

export const welcomeText = classnames(
  position('absolute'),
  textAlign('text-center'),
  fontStyle('italic'),
  fontSize('text-base', 'lg:text-xl')
)

export const info = classnames(
  display('flex'),
  justifyContent('justify-between'),
  margin('my-10'),
  fontSize('text-xs', 'sm:text-sm', 'md:text-xl', 'lg:text-2xl'),
  fontWeight('font-normal')
)

export const mainContainer = classnames(
  display('grid'),
  gridTemplateColumns('grid-cols-1', 'lg:grid-cols-2'),
  gap('gap-8'),
  overflow('overflow-x-clip')
)

export const aboutContainer = classnames(
  display('flex'),
  flexDirection('flex-col'),
  justifyContent('justify-between'),
  width('w-full')
)
export const animateContainer = classnames(height('h-2/6'), margin('mb-10'))
export const textContainer = classnames(position('absolute'), display('flex'), transformOrigin('origin-about'))
export const about = classnames(
  fontSize(
    'text-[3.5rem]' as TTailwindString,
    'sm:text-[6.5rem]' as TTailwindString,
    'md:text-9xl',
    'lg:text-[12vw]' as TTailwindString
  ),
  fontWeight('font-bold')
)
export const aboutCover = classnames(about, opacity('opacity-0'))
export const aboutSub = classnames(fontSize('text-sm'), position('!absolute'))

export const line = classnames(margin('my-20'))
