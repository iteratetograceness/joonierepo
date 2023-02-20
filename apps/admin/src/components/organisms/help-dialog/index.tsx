import React, { useState } from "react"
import Button from "../../fundamentals/button"
import DiscordIcon from "../../fundamentals/icons/discord-icon"
import InputField from "../../molecules/input"
import TextArea from "../../molecules/textarea"

import * as Dialog from "@radix-ui/react-dialog"

type MailDialogProps = {
  onClose: () => void
  open: boolean
}

const MailDialog = ({ open, onClose }: MailDialogProps) => {
  const [subject, setSubject] = useState("")
  const [body, setBody] = useState("")
  const [link, setLink] = useState("mailto:support@medusajs.com")

  React.useEffect(() => {
    setLink(
      `mailto:support@medusajs.com?subject=${encodeURI(
        subject
      )}&body=${encodeURI(body)}`
    )
  }, [subject, body])

  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Overlay className="fixed top-0 bottom-0 left-0 right-0 z-50 overflow-y-auto grid place-items-end">
        <Dialog.Content className="bg-grey-0 w-[400px] shadow-dropdown rounded-rounded p-8 top-[64px] bottom-2 right-3 fixed flex flex-col justify-between">
          <div>
            <Dialog.Title className="mb-1 inter-xlarge-semibold">
              How can we help?
            </Dialog.Title>
            <Dialog.Description className="mb-6 inter-small-regular text-grey-50">
              We usually respond in a few hours
            </Dialog.Description>
            <InputField
              label={"Subject"}
              value={subject}
              className="mb-4"
              placeholder="What is it about?..."
              onChange={(e) => setSubject(e.target.value)}
            />
            <TextArea
              label={"How can we help?"}
              placeholder="Write a message..."
              value={body}
              onChange={(e) => {
                setBody(e.target.value)
              }}
              rows={8}
              enableEmoji
            />
          </div>
          <div className="flex flex-col items-center gap-y-base">
            <a
              href="https://discord.gg/medusajs"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full cursor-pointer group"
            >
              <div className="flex flex-col items-center justify-center w-full rounded-rounded group-hover:bg-grey-5 py-small">
                <span className="mb-3 text-grey-40">
                  <DiscordIcon size={24} />
                </span>
                <p className="text-center text-grey-40 inter-small-regular leading-6">
                  Feel free to join our community of
                  <br />
                  merchants and e-commerce developers
                </p>
              </div>
            </a>
            <a className="w-full" href={link}>
              <Button variant="primary" size="large" className="w-full">
                Send a message
              </Button>
            </a>
          </div>
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog.Root>
  )
}

export default MailDialog
