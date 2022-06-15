import classnames, {
  fontSize,
  fontWeight,
  letterSpacing,
  lineHeight,
  margin,
  textAlign,
  TTailwindString,
} from 'tailwindcss-classnames'

export const name = classnames(
  fontSize(
    'text-[10.9vw]' as TTailwindString,
    'md:text-[11.5vw]' as TTailwindString,
    'lg:text-[11.9vw]' as TTailwindString
  ),
  textAlign('text-center'),
  fontWeight('font-bold'),
  margin('mt-0'),
  lineHeight('leading-none'),
  letterSpacing('tracking-tighter')
)
