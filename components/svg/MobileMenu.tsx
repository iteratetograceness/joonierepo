type Props = {
  color: string
}

const MobileMenu = ({ color }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    height="80%"
    preserveAspectRatio="xMinYMin meet"
    viewBox="0 0 600 600"
  >
    <path
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="42.85714"
      d="M578.57142857 85.71428571H21.42857143M578.57142857 300H21.42857143m557.14285714 214.28571429H21.42857143"
    />
  </svg>
)

export default MobileMenu
