import React, { useContext, useEffect, useState } from "react"
import { Controller, useWatch } from "react-hook-form"
import Spinner from "../../../../components/atoms/spinner"
import Button from "../../../../components/fundamentals/button"
import AlertIcon from "../../../../components/fundamentals/icons/alert-icon"
import TrashIcon from "../../../../components/fundamentals/icons/trash-icon"
import { SteppedContext } from "../../../../components/molecules/modal/stepped-modal"
import Select from "../../../../components/molecules/select"
import CurrencyInput from "../../../../components/organisms/currency-input"
import { extractOptionPrice } from "../../../../utils/prices"
import { useNewOrderForm } from "../form"

const SelectShippingMethod = () => {
  const { disableNextPage, enableNextPage } = useContext(SteppedContext)
  const [showCustomPrice, setShowCustomPrice] = useState(false)

  const {
    context: { region, shippingOptions },
    form: { control, setValue },
  } = useNewOrderForm()

  const currentCustomPrice = useWatch({
    control,
    name: "custom_shipping_price",
  })

  useEffect(() => {
    if (!showCustomPrice && currentCustomPrice) {
      setShowCustomPrice(true)
    }
  }, [currentCustomPrice])

  const selectedShippingOption = useWatch({
    control,
    name: "shipping_option",
  })

  const removeCustomPrice = () => {
    setShowCustomPrice(false)
    setValue("custom_shipping_price", undefined)
  }

  useEffect(() => {
    if (!selectedShippingOption) {
      disableNextPage()
    }

    if (selectedShippingOption) {
      enableNextPage()
    }
  }, [selectedShippingOption])

  return (
    <div className="min-h-[705px]">
      <span className="inter-base-semibold">
        Shipping method{" "}
        <span className="inter-base-regular text-grey-50">
          (To {region!.name})
        </span>
      </span>

      {region ? (
        !shippingOptions?.length ? (
          <div className="flex p-4 mt-6 inter-small-regular text-orange-50 bg-orange-5 rounded-rounded">
            <div className="h-full mr-3">
              <AlertIcon size={20} />
            </div>
            <div className="flex flex-col">
              <span className="inter-small-semibold">Attention!</span>
              You don't have any options for orders without shipping. Please add
              one (e.g. "In-store fulfillment") with "Show on website" unchecked
              in region settings and continue.
            </div>
          </div>
        ) : (
          <div className="mt-4">
            <Controller
              control={control}
              name="shipping_option"
              render={({ field: { value, onChange } }) => {
                return (
                  <Select
                    label="Choose a shipping method"
                    onChange={onChange}
                    value={value}
                    options={
                      shippingOptions?.map((so) => ({
                        value: so.id,
                        label: `${so.name} - ${extractOptionPrice(
                          so.amount,
                          region
                        )}`,
                      })) || []
                    }
                  />
                )
              }}
            />
            <div className="mt-4">
              {!showCustomPrice && (
                <div className="flex justify-end w-full">
                  <Button
                    variant="ghost"
                    size="small"
                    className="w-[125px] border border-grey-20"
                    disabled={!selectedShippingOption}
                    onClick={() => setShowCustomPrice(true)}
                  >
                    Set custom price
                  </Button>
                </div>
              )}
              {showCustomPrice && (
                <div className="flex items-center">
                  <div className="w-full">
                    <Controller
                      control={control}
                      name="custom_shipping_price"
                      render={({ field: { value, onChange } }) => {
                        return (
                          <CurrencyInput.Root
                            readOnly
                            size="small"
                            currentCurrency={region.currency_code}
                          >
                            <CurrencyInput.Amount
                              label="Custom Price"
                              amount={value}
                              onChange={onChange}
                            />
                          </CurrencyInput.Root>
                        )
                      }}
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="small"
                    onClick={removeCustomPrice}
                    className="w-8 h-8 ml-8 text-grey-40"
                  >
                    <TrashIcon size={20} />
                  </Button>
                </div>
              )}
            </div>
          </div>
        )
      ) : (
        <div className="flex items-center justify-center flex-1">
          <Spinner />
        </div>
      )}
    </div>
  )
}

export default SelectShippingMethod
