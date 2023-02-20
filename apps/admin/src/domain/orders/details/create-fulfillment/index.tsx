import {
  AdminPostOrdersOrderClaimsClaimFulfillmentsReq,
  AdminPostOrdersOrderFulfillmentsReq,
  AdminPostOrdersOrderSwapsSwapFulfillmentsReq,
  ClaimOrder,
  Order,
  Swap,
} from "@medusajs/medusa"
import {
  useAdminCreateFulfillment,
  useAdminFulfillClaim,
  useAdminFulfillSwap,
} from "medusa-react"
import React, { useState } from "react"
import Button from "../../../../components/fundamentals/button"
import CheckIcon from "../../../../components/fundamentals/icons/check-icon"
import IconTooltip from "../../../../components/molecules/icon-tooltip"
import Modal from "../../../../components/molecules/modal"
import Metadata, {
  MetadataField,
} from "../../../../components/organisms/metadata"
import useNotification from "../../../../hooks/use-notification"
import { getErrorMessage } from "../../../../utils/error-messages"
import CreateFulfillmentItemsTable from "./item-table"

type CreateFulfillmentModalProps = {
  handleCancel: () => void
  address?: object
  email?: string
  orderToFulfill: Order | ClaimOrder | Swap
  orderId: string
}

const CreateFulfillmentModal: React.FC<CreateFulfillmentModalProps> = ({
  handleCancel,
  orderToFulfill,
  orderId,
}) => {
  const [toFulfill, setToFulfill] = useState<string[]>([])
  const [quantities, setQuantities] = useState({})
  const [noNotis, setNoNotis] = useState(false)
  const [metadata, setMetadata] = useState<MetadataField[]>([
    { key: "", value: "" },
  ])

  const items =
    "items" in orderToFulfill
      ? orderToFulfill.items
      : orderToFulfill.additional_items

  const createOrderFulfillment = useAdminCreateFulfillment(orderId)
  const createSwapFulfillment = useAdminFulfillSwap(orderId)
  const createClaimFulfillment = useAdminFulfillClaim(orderId)

  const isSubmitting =
    createOrderFulfillment.isLoading ||
    createSwapFulfillment.isLoading ||
    createClaimFulfillment.isLoading

  const notification = useNotification()

  const createFulfillment = () => {
    const [type] = orderToFulfill.id.split("_")

    type actionType =
      | typeof createOrderFulfillment
      | typeof createSwapFulfillment
      | typeof createClaimFulfillment

    let action: actionType = createOrderFulfillment
    let successText = "Successfully fulfilled order"
    let requestObj

    const preparedMetadata = metadata.reduce((acc, next) => {
      if (next.key) {
        return {
          ...acc,
          [next.key]: next.value,
        }
      } else {
        return acc
      }
    }, {})

    switch (type) {
      case "swap":
        action = createSwapFulfillment
        successText = "Successfully fulfilled swap"
        requestObj = {
          swap_id: orderToFulfill.id,
          metadata: preparedMetadata,
          no_notification: noNotis,
        } as AdminPostOrdersOrderSwapsSwapFulfillmentsReq
        break

      case "claim":
        action = createClaimFulfillment
        successText = "Successfully fulfilled claim"
        requestObj = {
          claim_id: orderToFulfill.id,
          metadata: preparedMetadata,
          no_notification: noNotis,
        } as AdminPostOrdersOrderClaimsClaimFulfillmentsReq
        break

      default:
        requestObj = {
          metadata: preparedMetadata,
          no_notification: noNotis,
        } as AdminPostOrdersOrderFulfillmentsReq
        requestObj.items = toFulfill
          .map((itemId) => ({ item_id: itemId, quantity: quantities[itemId] }))
          .filter((t) => !!t)
        break
    }

    action.mutate(requestObj, {
      onSuccess: () => {
        notification("Success", successText, "success")
        handleCancel()
      },
      onError: (err) => notification("Error", getErrorMessage(err), "error"),
    })
  }

  return (
    <Modal handleClose={handleCancel}>
      <Modal.Body>
        <Modal.Header handleClose={handleCancel}>
          <span className="inter-xlarge-semibold">Create Fulfillment</span>
        </Modal.Header>
        <Modal.Content>
          <div className="flex flex-col">
            <span className="mb-2 inter-base-semibold">Items</span>
            <CreateFulfillmentItemsTable
              items={items}
              toFulfill={toFulfill}
              setToFulfill={setToFulfill}
              quantities={quantities}
              setQuantities={setQuantities}
            />
            <div className="mt-4">
              <Metadata metadata={metadata} setMetadata={setMetadata} />
            </div>
          </div>
        </Modal.Content>
        <Modal.Footer>
          <div className="flex justify-between w-full h-8">
            <div
              className="flex items-center h-full cursor-pointer"
              onClick={() => setNoNotis(!noNotis)}
            >
              <div
                className={`w-5 h-5 flex justify-center text-grey-0 border-grey-30 border rounded-base ${
                  !noNotis && "bg-violet-60"
                }`}
              >
                <span className="self-center">
                  {!noNotis && <CheckIcon size={16} />}
                </span>
              </div>
              <input
                id="noNotification"
                className="hidden"
                name="noNotification"
                checked={!noNotis}
                type="checkbox"
              />
              <span className="flex items-center ml-3 text-grey-90 gap-x-xsmall">
                Send notifications
                <IconTooltip content="" />
              </span>
            </div>
            <div className="flex">
              <Button
                variant="ghost"
                className="justify-center w-32 mr-2 text-small"
                size="large"
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button
                size="large"
                className="justify-center w-32 text-small"
                variant="primary"
                disabled={!toFulfill?.length || isSubmitting}
                onClick={createFulfillment}
                loading={isSubmitting}
              >
                Complete
              </Button>
            </div>
          </div>
        </Modal.Footer>
      </Modal.Body>
    </Modal>
  )
}

export default CreateFulfillmentModal
