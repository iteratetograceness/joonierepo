import React, { ReactNode } from "react"

type Props = {
  fileName: string
  fileSize?: string
  icon?: ReactNode
  onClick?: () => void
}

const BatchJobFileCard = ({ fileName, fileSize, icon, onClick }: Props) => {
  const preparedOnClick = (onClick ?? (() => void 0))

  return (
    <div
      className="flex items-center w-full mt-4 cursor-pointer"
      onClick={preparedOnClick}
    >
      <div
        className="flex items-center justify-center p-2.5 border border-grey-20 rounded-lg"
        title={fileName}
      >
        {!!icon && icon}
      </div>

      <div className="relative w-full pl-4 text-left">
        <div
          className="overflow-hidden truncate inter-small-regular max-w-[80%]"
        >
          {fileName}
        </div>

        {!!fileSize && (
          <div className="text-grey-40 inter-small-regular">
            {fileSize}
          </div>
        )}
      </div>
    </div>
  )
}

export default BatchJobFileCard
