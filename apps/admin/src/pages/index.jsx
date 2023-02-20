import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Spinner from "../components/atoms/spinner"
import SEO from "../components/seo"

const IndexPage = () => {
  const navigate = useNavigate()
  useEffect(() => {
    navigate("/a/orders")
  }, [])

  return (
    <div className="flex items-center justify-center w-full h-screen bg-grey-5 text-grey-90">
      <SEO title="Home" />
      <Spinner variant="secondary" />
    </div>
  )
}

export default IndexPage
