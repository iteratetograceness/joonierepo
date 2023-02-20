import React from "react"

type GridInputProps = React.InputHTMLAttributes<HTMLInputElement>

const GridInput: React.FC<GridInputProps> = ({ value, ...props }) => {
  return (
    <input
      className="w-full h-full px-2 py-4 bg-transparent border border-transparent outline-none outline-0 leading-base rounded-rounded inter-small-regular placeholder:text-grey-40 focus-within:shadow-input focus-within:border focus-within:border-violet-60"
      value={value}
      {...props}
    />
  )
}

export default GridInput
