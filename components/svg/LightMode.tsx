type Props = {
  color: string
  className?: string
}

const LightModeIcon = ({ color, className }: Props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 600 600`} className={className} x={105} y={105}>
    <g fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" transform="scale(15)">
      <circle cx="7" cy="7" r="2.5" />
      <path d="M7 .5v2m-4.6-.1 1.42 1.42M.5 7h2m-.1 4.6 1.42-1.42M7 13.5v-2m4.6.1-1.42-1.42M13.5 7h-2m.1-4.6-1.42 1.42" />
    </g>
  </svg>
)

export default LightModeIcon
