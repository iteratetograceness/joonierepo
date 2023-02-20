import React, { useState } from "react"

import Button from "../fundamentals/button"
import Modal from "../molecules/modal"

type ConfirmationPromptProps = {
  heading: string
  text: string
  cancelText: string
  confirmText: string
  handleClose: () => void
  onConfirm: () => Promise<void>
}

const ConfirmationPrompt: React.FC<ConfirmationPromptProps> = ({
  heading,
  text,
  cancelText,
  confirmText,
  handleClose,
  onConfirm,
}) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()

    setIsLoading(true)
    onConfirm().finally(() => {
      setIsLoading(false)
      handleClose()
    })
  }

  return (
    <Modal isLargeModal={false} handleClose={handleClose}>
      <Modal.Body>
        <Modal.Content>
          <div className="flex flex-col">
            <span className="inter-large-semibold">{heading}</span>
            <span className="mt-1 inter-base-regular text-grey-50">{text}</span>
          </div>
        </Modal.Content>
        <Modal.Footer>
          <div className="flex justify-end w-full h-8">
            <Button
              variant="ghost"
              className="justify-center w-24 mr-2 text-small"
              size="small"
              onClick={handleClose}
            >
              {cancelText}
            </Button>
            <Button
              loading={isLoading}
              size="small"
              className="justify-center w-24 text-small"
              variant="primary"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {confirmText}
            </Button>
          </div>
        </Modal.Footer>
      </Modal.Body>
    </Modal>
  )
}

export default ConfirmationPrompt
