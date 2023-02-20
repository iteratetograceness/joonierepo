import React from "react"
import Badge from "../../fundamentals/badge"
import Actionables, {
  ActionType,
} from "../actionables"

type NumberedItemProps = {
  actions?: ActionType[]
  index: number
  title: string
  description?: React.ReactNode | string
}

const NumberedItem: React.FC<NumberedItemProps> = ({
  actions,
  index,
  title,
  description,
}) => {
  return (
    <div className="flex items-center justify-between border p-base rounded-rounded gap-base">
      <div className="flex w-full overflow-hidden gap-base">
        <div>
          <Badge
            className="inter-base-semibold flex justify-center items-center w-[40px] h-[40px]"
            variant="default"
          >
            §{index}
          </Badge>
        </div>
        <div className="flex flex-col justify-center flex-1 w-full truncate">
          <div className="inter-small-semibold">{title}</div>
          {description &&
            (typeof description === "string" ? (
              <div className="inter-small-regular text-grey-50">
                {description}
              </div>
            ) : (
              description
            ))}
        </div>
      </div>
      {actions && (
        <div>
          <Actionables forceDropdown actions={actions} />
        </div>
      )}
    </div>
  )
}

export default NumberedItem
