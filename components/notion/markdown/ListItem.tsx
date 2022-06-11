import { LiProps } from 'react-markdown/lib/ast-to-react'

const ListItem = ({ checked, ordered, index, children }: LiProps) => {
  // TODO: Ordered list item
  if (ordered) {
    return (
      <li>
        {index}. {children}
      </li>
    )
  }

  if (checked) {
    return <li>{children}</li>
  }

  return <li>* {children}</li>
}

export default ListItem
