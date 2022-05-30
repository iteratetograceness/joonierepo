import classnames, { fontSize, textAlign, fontWeight, margin } from 'tailwindcss-classnames'

/**
 * Big Heading
 */

export const title = classnames(fontSize('text-5xl'), textAlign('text-center'), fontWeight('font-normal'))

export const subtitle = classnames(
  fontWeight('font-thin'),
  textAlign('text-center'),
  fontSize('text-xs', 'md:text-sm'),
  margin('mb-4')
)

export const titleContainer = classnames(margin('my-8'))
