import clsx from "clsx"
import React, { useContext } from "react"
import Button from "../../../fundamentals/button"
import InputField from "../../input"
import Modal from "../../modal"
import LayeredModal, {
  LayeredModalContext,
} from "../../modal/layered-modal"
import Table from "../../table"
import { formatAmountWithSymbol } from "../../../../utils/prices"

const reasonOptions = {
  missing_item: "Missing Item",
  wrong_item: "Wrong Item",
  production_failure: "Production Failure",
  other: "Other",
}

const ClaimDetails = ({ claim, order, onDismiss }) => {
  const layeredModalContext = useContext(LayeredModalContext)

  return (
    <LayeredModal
      context={layeredModalContext}
      handleClose={onDismiss}
      isLargeModal
    >
      <Modal.Body>
        <Modal.Header handleClose={onDismiss}>
          <h2 className="inter-xlarge-semibold">Claim Details</h2>
        </Modal.Header>
        <Modal.Content>
          <div>
            <h3 className="inter-base-semibold">Claimed Items</h3>
            <Table>
              <Table.HeadRow className="text-grey-50 inter-small-semibold">
                <Table.HeadCell>Product Details</Table.HeadCell>
                <Table.HeadCell className="pr-8 text-right">
                  Quantity
                </Table.HeadCell>
                <Table.HeadCell className="text-right">
                  Unit Price
                </Table.HeadCell>
                <Table.HeadCell></Table.HeadCell>
              </Table.HeadRow>
              <Table.Body>
                {claim.claim_items?.map((claimItem) => {
                  const { item } = claimItem
                  return (
                    <>
                      <Table.Row
                        className={clsx("border-b-grey-0 hover:bg-grey-0")}
                      >
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
                                <span className="text-grey-90">
                                  {item.title}
                                </span>{" "}
                              </span>
                              <span>{item?.variant?.title || ""}</span>
                            </div>
                          </div>
                        </Table.Cell>
                        <Table.Cell className="w-32 pr-8 text-right">
                          <span className="text-grey-40">
                            {claimItem.quantity}
                          </span>
                        </Table.Cell>
                        <Table.Cell className="text-right">
                          {formatAmountWithSymbol({
                            currency: order.currency_code,
                            amount: item.unit_price,
                            tax: order.tax_rate,
                          })}
                        </Table.Cell>
                        <Table.Cell className="pr-1 text-right text-grey-40">
                          {order.currency_code.toUpperCase()}
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row className="last:border-b-0 hover:bg-grey-0">
                        <Table.Cell colSpan={2}>
                          <div className="max-w-[470px] truncate">
                            {claimItem.reason && (
                              <span className="inter-small-regular text-grey-40">
                                <span className="mr-1 text-grey-80">
                                  <span className="mr-1 inter-small-semibold">
                                    {reasonOptions[claimItem.reason]}
                                  </span>
                                </span>
                                {claimItem.note || ""}
                                <span className="ml-2">
                                  {claimItem.images?.length > 0 && (
                                    <>
                                      ({claimItem.images?.length} image
                                      {claimItem.images?.length > 1 ? "s" : ""})
                                    </>
                                  )}
                                </span>
                              </span>
                            )}
                          </div>
                        </Table.Cell>
                        <Table.Cell colSpan={2}>
                          <div className="flex justify-end w-full">
                            <Button
                              onClick={() =>
                                layeredModalContext.push(
                                  ReasonDetails(
                                    layeredModalContext.pop,
                                    claimItem
                                  )
                                )
                              }
                              variant="ghost"
                              size="small"
                              className="border border-grey-20"
                            >
                              View
                            </Button>
                          </div>
                        </Table.Cell>
                      </Table.Row>
                    </>
                  )
                })}
              </Table.Body>
            </Table>
          </div>
        </Modal.Content>
        <Modal.Footer>
          <div className="flex justify-end w-full">
            <div className="flex gap-x-xsmall">
              <Button
                onClick={() => onDismiss()}
                className="w-[112px]"
                size="small"
                variant="primary"
              >
                Done
              </Button>
            </div>
          </div>
        </Modal.Footer>
      </Modal.Body>
    </LayeredModal>
  )
}

export default ClaimDetails

const ReasonDetails = (pop, claimItem) => {
  return {
    title: "Claim Item",
    onBack: () => pop(),
    view: (
      <>
        <Modal.Content>
          <div className="h-full">
            <h2 className="mb-4 inter-base-semibold">Claim Reason</h2>
            <div className="mb-8 text-grey-50 inter-small-semibold">
              {reasonOptions[claimItem.reason]}
            </div>
            <InputField
              disabled={true}
              label={"Note"}
              value={claimItem.note}
              className="my-4"
            />
            {claimItem.images &&
              claimItem.images.map((i) => (
                <ImageRow
                  url={i.url}
                  name={i.url.split("//").pop()}
                  size={undefined}
                />
              ))}
          </div>
        </Modal.Content>
        <Modal.Footer>
          <div className="flex justify-end w-full gap-x-xsmall">
            <Button
              variant="primary"
              className="w-[112px]"
              size="small"
              onClick={() => {
                pop()
              }}
            >
              Back
            </Button>
          </div>
        </Modal.Footer>
      </>
    ),
  }
}

const ImageRow = ({ url, name, size }) => (
  <div className="flex items-center justify-between w-full my-8">
    <div className="flex items-center">
      <div className="w-20 h-20 bg-voilet-60">
        <img className="object-cover w-full h-full rounded-rounded" src={url} />
      </div>
      <div className="flex flex-col ml-8 inter-small-regular">
        {name}
        {size && <span className="text-grey-50">{size} KB</span>}
      </div>
    </div>
  </div>
)
