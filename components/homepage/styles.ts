import classnames, {
  display,
  fontSize,
  fontWeight,
  gridTemplateColumns,
  justifyContent,
  letterSpacing,
  lineHeight,
  margin,
  textAlign,
  TTailwindString,
} from 'tailwindcss-classnames'

export const nameContainer = classnames(margin('mb-12'))

export const name = classnames(
  fontSize(
    'text-[10.8vw]' as TTailwindString,
    'md:text-[11.5vw]' as TTailwindString,
    'lg:text-[11.9vw]' as TTailwindString
  ),
  textAlign('text-center'),
  fontWeight('font-bold'),
  margin('mt-0'),
  lineHeight('leading-none'),
  letterSpacing('tracking-tighter')
)

export const info = classnames(display('flex'), justifyContent('justify-between'), margin('mb-6'))

export const mainContainer = classnames(display('grid'), gridTemplateColumns('grid-cols-1', 'lg:grid-cols-2'))
