import React, { ReactNode } from "react"
import type { Toast } from "react-hot-toast"
import { toast as globalToast } from "react-hot-toast"
import RefreshIcon from "../../fundamentals/icons/refresh-icon"
import ToasterContainer from "../toaster-container"
import ErrorState from "./error-state"
import SavingState from "./saving-state"
import SuccessState from "./success-state"

type SaveNotificationProps = {
  toast: Toast
  icon?: ReactNode
  title?: string
  message?: string
  onSave: () => Promise<void>
  reset: () => void
}

const SaveNotification: React.FC<SaveNotificationProps> = ({
  toast,
  icon,
  title = "Unsaved changes",
  message = "You have unsaved changes. Do you want to save and publish or discard them?",
  onSave,
  reset,
}) => {
  const onDismiss = () => {
    reset()
    globalToast.dismiss(toast.id)
  }

  const handleSave = () => {
    globalToast.custom((t) => <SavingState toast={t} />, {
      id: toast.id,
    })

    onSave()
      .then(() => {
        globalToast.custom(
          (t) => <SuccessState toast={t} onDismiss={onDismiss} />,
          {
            id: toast.id,
          }
        )
      })
      .catch((_err) => {
        globalToast.custom(
          (t) => <ErrorState toast={t} onDismiss={onDismiss} />,
          {
            id: toast.id,
          }
        )
      })
  }

  return (
    <ToasterContainer visible={toast.visible} className="p-0 pl-base w-[448px]">
      <div className="py-base">{getIcon(icon)}</div>
      <div className="flex flex-col flex-grow ml-small mr-base gap-y-2xsmall py-base">
        <span className="inter-small-semibold">{title}</span>
        <span className="inter-small-regular text-grey-50">{message}</span>
      </div>
      <div className="flex flex-col h-full border-l inter-small-semibold border-grey-20">
        <button
          onClick={handleSave}
          className="flex items-center justify-center border-b inter-small-semibold h-1/2 border-grey-20 px-base text-violet-60"
        >
          Publish
        </button>
        <button
          className="flex items-center justify-center inter-small-semibold h-1/2 px-base"
          onClick={onDismiss}
        >
          Discard
        </button>
      </div>
    </ToasterContainer>
  )
}

const ICON_SIZE = 20

function getIcon(icon?: any) {
  if (icon) {
    return React.cloneElement(icon, {
      size: ICON_SIZE,
      className: "text-grey-90",
    })
  } else {
    return <RefreshIcon size={20} className="text-grey-90" />
  }
}

export default SaveNotification