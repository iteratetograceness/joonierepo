import { useAdminRegion } from "medusa-react"
import React from "react"
import Spinner from "../../../../components/atoms/spinner"
import GeneralSection from "./general-section"
import ReturnShippingOptions from "./return-shipping-options"
import ShippingOptions from "./shipping-options"

type Props = {
  id?: string
}

const EditRegion = ({ id }: Props) => {
  const { region, isLoading, isError } = useAdminRegion(id!, {
    enabled: !!id,
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <Spinner variant="secondary" />
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full text-center border bg-grey-0 rounded-rounded border-grey-20 gap-y-xsmall ">
        <h1 className="inter-large-semibold">Something went wrong...</h1>
        <p className="inter-base-regular text-grey-50">
          We can't find a region with that ID, use the menu to the left to
          select a region.
        </p>
      </div>
    )
  }

  if (!region) {
    return null
  }

  return (
    <div className="flex flex-col gap-y-xsmall">
      <GeneralSection region={region} />
      <ShippingOptions region={region} />
      <ReturnShippingOptions region={region} />
    </div>
  )
}

export default EditRegion
