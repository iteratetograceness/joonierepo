import React from "react"
import { Link } from "react-router-dom"
import ChevronRightIcon from "../../fundamentals/icons/chevron-right-icon"

type SettingsCardProps = {
  icon: React.ReactNode
  heading: string
  description: string
  to?: string
  externalLink?: string
  disabled: boolean
}

const SettingsCard: React.FC<SettingsCardProps> = ({
  icon,
  heading,
  description,
  to = null,
  externalLink = null,
  disabled = false,
}) => {
  if (disabled) {
    to = null
  }

  return (
    <Link to={to ?? ""} className="flex items-center flex-1">
      <button
        className="flex items-center flex-1 h-full border group bg-grey-0 rounded-rounded p-large border-grey-20"
        disabled={disabled}
        onClick={() => {
          if (externalLink) {
            window.location.href = externalLink
          }
        }}
      >
        <div className="flex items-center justify-center h-2xlarge w-2xlarge bg-violet-20 rounded-circle text-violet-60 group-disabled:bg-grey-10 group-disabled:text-grey-40">
          {icon}
        </div>
        <div className="flex-1 text-left mx-large">
          <h3 className="m-0 inter-large-semibold text-grey-90 group-disabled:text-grey-40">
            {heading}
          </h3>
          <p className="m-0 inter-base-regular text-grey-50 group-disabled:text-grey-40">
            {description}
          </p>
        </div>
        <div className="text-grey-40 group-disabled:text-grey-30">
          <ChevronRightIcon />
        </div>
      </button>
    </Link>
  )
}

export default SettingsCard
