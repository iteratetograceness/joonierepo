type Props = {
  color: string
}

const DarkModeIcon = ({ color }: Props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1600" x={102} y={102}>
    <path
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="35"
      d="M514.28571429 449.14285714A280.71428571 280.71428571 0 0 1 276.85714286 21.42857143a280.71428571 280.71428571 0 0 0 42.85714285 557.14285714A276.85714286 276.85714286 0 0 0 557.14285714 445.2857143a291 291 0 0 1-42.85714285 3.85714285Z"
    />
  </svg>
)

export default DarkModeIcon
