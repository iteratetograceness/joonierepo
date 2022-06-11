import classnames, {
  alignItems,
  borderColor,
  borderRadius,
  borderWidth,
  display,
  flexDirection,
  fontSize,
  justifyContent,
  padding,
  textAlign,
  TTailwindString,
  width,
} from 'tailwindcss-classnames'

export const statusCode = classnames(fontSize('text-9xl'))
export const statusMsg = classnames(fontSize('sm:text-lg', 'md:text-2xl'), textAlign('text-center'))
export const oval = classnames(
  borderRadius('rounded-[60%]' as TTailwindString),
  borderColor('border-black', 'dark:border-white'),
  borderWidth('border-1'),
  width('w-min'),
  padding('p-10')
)
export const errorContainer = classnames(
  display('flex'),
  flexDirection('flex-col'),
  justifyContent('justify-center'),
  alignItems('items-center')
)
