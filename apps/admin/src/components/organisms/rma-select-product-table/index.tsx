import { LineItem, Order } from "@medusajs/medusa"
import clsx from "clsx"
import React, { Fragment, useContext } from "react"
import RMAReturnReasonSubModal from "../../../domain/orders/details/rma-sub-modals/return-reasons"
import Medusa from "../../../services/api"
import { isLineItemCanceled } from "../../../utils/is-line-item"
import { formatAmountWithSymbol } from "../../../utils/prices"
import CopyToClipboard from "../../atoms/copy-to-clipboard"
import Button from "../../fundamentals/button"
import CheckIcon from "../../fundamentals/icons/check-icon"
import MinusIcon from "../../fundamentals/icons/minus-icon"
import PlusIcon from "../../fundamentals/icons/plus-icon"
import { LayeredModalContext } from "../../molecules/modal/layered-modal"
import Table from "../../molecules/table"

type RMASelectProductTableProps = {
  order: Omit<Order, "beforeInsert">
  allItems: Omit<LineItem, "beforeInsert">[]
  toReturn: any
  setToReturn: (items: any) => void
  customReturnOptions?: any[]
  imagesOnReturns?: any
  isSwapOrClaim?: boolean
}

const RMASelectProductTable: React.FC<RMASelectProductTableProps> = ({
  order,
  allItems,
  toReturn,
  customReturnOptions = undefined,
  imagesOnReturns = false,
  setToReturn,
  isSwapOrClaim = false,
}) => {
  const { push, pop } = useContext(LayeredModalContext)

  const handleQuantity = (change, item) => {
    if (
      (item.quantity - item.returned_quantity === toReturn[item.id].quantity &&
        change > 0) ||
      (toReturn[item.id].quantity === 1 && change < 0)
    ) {
      return
    }

    const newReturns = {
      ...toReturn,
      [item.id]: {
        ...toReturn[item.id],
        quantity: (toReturn[item.id]?.quantity || 0) + change,
      },
    }

    setToReturn(newReturns)
  }

  const handleReturnToggle = (item) => {
    const id = item.id

    const newReturns = { ...toReturn }

    if (id in toReturn) {
      delete newReturns[id]
    } else {
      newReturns[id] = {
        images: imagesOnReturns ? [] : null,
        reason: null,
        note: "",
        quantity: item.quantity - item.returned_quantity,
      }
    }

    setToReturn(newReturns)
  }

  const handleAddImages = async (files) => {
    return Medusa.uploads
      .create(files)
      .then(({ data }) => data.uploads.map(({ url }) => url))
  }

  const setReturnReason = (reason, note, files, id) => {
    let newReturns = {}
    if (imagesOnReturns && files?.length) {
      handleAddImages(files).then((res) => {
        newReturns = {
          ...toReturn,
          [id]: {
            ...toReturn[id],
            reason: reason,
            note: note,
            images: [...(toReturn[id].images || []), ...res],
          },
        }
        setToReturn(newReturns)
      })
    } else {
      newReturns = {
        ...toReturn,
        [id]: {
          ...toReturn[id],
          reason: reason,
          note: note,
        },
      }

      setToReturn(newReturns)
    }
  }

  return (
    <Table>
      <Table.Head className="border-none">
        <Table.HeadRow className="text-grey-50 inter-small-semibold">
          <Table.HeadCell colSpan={2}>Product Details</Table.HeadCell>
          <Table.HeadCell className="pr-8 text-right">Quantity</Table.HeadCell>
          <Table.HeadCell className="text-right">Refundable</Table.HeadCell>
          <Table.HeadCell></Table.HeadCell>
        </Table.HeadRow>
      </Table.Head>
      <Table.Body>
        {allItems.map((item) => {
          // Only show items that have not been returned,
          // and aren't canceled
          if (
            item.returned_quantity === item.quantity ||
            isLineItemCanceled(item, order)
          ) {
            return
          }
          const checked = item.id in toReturn
          return (
            <Fragment key={item.id}>
              <Table.Row className={clsx("border-b-grey-0 hover:bg-grey-0")}>
                <Table.Cell>
                  <div className="flex items-center h-full ml-1">
                    <div
                      onClick={() => handleReturnToggle(item)}
                      className={`mr-4 w-5 h-5 flex justify-center text-grey-0 border-grey-30 border cursor-pointer rounded-base ${
                        checked && "bg-violet-60"
                      }`}
                    >
                      <span className="self-center">
                        {checked && <CheckIcon size={16} />}
                      </span>
                    </div>

                    <input
                      className="hidden"
                      checked={checked}
                      tabIndex={-1}
                      onChange={() => handleReturnToggle(item)}
                      type="checkbox"
                    />
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <div className="min-w-[240px] flex py-2">
                    <div className="w-[30px] h-[40px] ">
                      <img
                        className="object-cover w-full h-full rounded"
                        src={item.thumbnail}
                      />
                    </div>
                    <div className="flex flex-col ml-4 inter-small-regular text-grey-50">
                      <span>
                        <span className="text-grey-90">{item.title}</span>
                      </span>
                      <div className="flex gap-4">
                        {item?.variant?.title && (
                          <span>{item.variant.title}</span>
                        )}
                        {item?.variant?.sku && (
                          <CopyToClipboard
                            value={item.variant.sku}
                            iconSize={14}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </Table.Cell>
                <Table.Cell className="w-32 pr-8 text-right">
                  {item.id in toReturn ? (
                    <div className="flex justify-end w-full text-right text-grey-50 ">
                      <span
                        onClick={() => handleQuantity(-1, item)}
                        className="flex items-center justify-center w-5 h-5 mr-2 rounded cursor-pointer hover:bg-grey-20"
                      >
                        <MinusIcon size={16} />
                      </span>
                      <span>{toReturn[item.id].quantity || ""}</span>
                      <span
                        onClick={() => handleQuantity(1, item)}
                        className={clsx(
                          "w-5 h-5 flex items-center justify-center rounded cursor-pointer hover:bg-grey-20 ml-2"
                        )}
                      >
                        <PlusIcon size={16} />
                      </span>
                    </div>
                  ) : (
                    <span className="text-grey-40">
                      {item.quantity - item.returned_quantity}
                    </span>
                  )}
                </Table.Cell>
                <Table.Cell className="text-right">
                  {formatAmountWithSymbol({
                    currency: order.currency_code,
                    amount: item.refundable || 0,
                  })}
                </Table.Cell>
                <Table.Cell className="pr-1 text-right text-grey-40">
                  {order.currency_code.toUpperCase()}
                </Table.Cell>
              </Table.Row>
              {checked && !isSwapOrClaim && (
                <Table.Row className="last:border-b-0 hover:bg-grey-0">
                  <Table.Cell></Table.Cell>
                  <Table.Cell colSpan={2}>
                    <div className="max-w-[470px] truncate">
                      {toReturn[item.id]?.reason && (
                        <span className="inter-small-regular text-grey-40">
                          <span className="mr-1 text-grey-80">
                            <span className="mr-1 inter-small-semibold">
                              {toReturn[item.id]?.reason.label}
                            </span>
                          </span>
                          {toReturn[item.id]?.note || ""}
                          <span className="ml-2">
                            {toReturn[item.id]?.images?.length > 0 && (
                              <>
                                ({toReturn[item.id]?.images?.length} image{" "}
                                {toReturn[item.id]?.images?.length > 1
                                  ? "s"
                                  : ""}
                                )
                              </>
                            )}
                          </span>
                        </span>
                      )}
                    </div>
                  </Table.Cell>
                  <Table.Cell colSpan={2}>
                    <div className="flex justify-end w-full mb-small">
                      <Button
                        onClick={() =>
                          push(
                            ReturnReasonScreen(
                              pop,
                              toReturn[item.id]?.reason,
                              toReturn[item.id]?.note,
                              customReturnOptions,
                              imagesOnReturns,
                              (reason, note, files) =>
                                setReturnReason(reason, note, files, item.id)
                            )
                          )
                        }
                        variant="ghost"
                        size="small"
                        className="border border-grey-20"
                      >
                        Select Reason
                      </Button>
                    </div>
                  </Table.Cell>
                </Table.Row>
              )}
            </Fragment>
          )
        })}
      </Table.Body>
    </Table>
  )
}

const ReturnReasonScreen = (
  pop,
  reason,
  note,
  customReturnOptions,
  imagesOnReturns,
  setReturnReason
) => {
  return {
    title: "Return Reasons",
    onBack: () => pop(),
    view: (
      <RMAReturnReasonSubModal
        reason={reason}
        existingNote={note}
        customReturnOptions={customReturnOptions}
        addImage={imagesOnReturns}
        onSubmit={setReturnReason}
      />
    ),
  }
}

export default RMASelectProductTable
