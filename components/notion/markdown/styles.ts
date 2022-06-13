import {
  backgroundColor,
  borderRadius,
  classnames,
  fontFamily,
  fontSize,
  margin,
  padding,
  textColor,
} from 'tailwindcss-classnames'

export const markdown = '!max-w-prose prose-p:mb-2 leading-relaxed'

export const inlineCode = classnames(
  backgroundColor('bg-black', 'dark:bg-white'),
  textColor('text-white', 'dark:text-black'),
  fontFamily('font-mono'),
  fontSize('text-sm'),
  padding('px-2', 'py-0.5'),
  borderRadius('rounded-md')
)

export const text = classnames(margin('!mb-5'))

const heading = classnames(margin('my-7'))
export const h1 = classnames(heading, fontSize('text-5xl'))
export const h2 = classnames(heading, fontSize('text-4xl'))
export const h3 = classnames(heading, fontSize('text-3xl'))
export const h4 = classnames(heading, fontSize('text-2xl'))
export const h5 = classnames(heading, fontSize('text-xl'))
export const h6 = classnames(heading, fontSize('text-lg'))

export const image = classnames(borderRadius('rounded-3xl'))
