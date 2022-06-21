import classnames, {
  display,
  flexDirection,
  fontSize,
  fontWeight,
  gap,
  gridTemplateColumns,
  justifyContent,
  letterSpacing,
  lineHeight,
  margin,
  overflow,
  position,
  textAlign,
  TTailwindString,
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

export const info = classnames(
  display('flex'),
  justifyContent('justify-between'),
  margin('my-10'),
  fontSize('text-sm', 'md:text-xl', 'lg:text-2xl'),
  fontWeight('font-normal')
)

export const mainContainer = classnames(
  display('grid'),
  gridTemplateColumns('grid-cols-1', 'lg:grid-cols-2'),
  gap('gap-8'),
  overflow('overflow-x-clip')
)

export const aboutContainer = classnames(display('flex'), flexDirection('flex-col'), justifyContent('justify-between'))
export const textContainer = classnames(position('absolute'), display('flex'))
export const about = classnames(
  fontSize(
    'text-[3.2rem]' as TTailwindString,
    'sm:text-[6.5rem]' as TTailwindString,
    'md:text-9xl',
    'lg:text-[8vw]' as TTailwindString
  ),
  fontWeight('font-bold')
)
export const aboutSub = classnames(fontSize('text-sm'), position('!absolute'))
