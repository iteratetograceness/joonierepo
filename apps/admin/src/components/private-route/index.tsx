import React, { useContext, useEffect, useState, ReactNode } from "react"
import { useNavigate } from "react-router-dom"
import { AccountContext } from "../../context/account"
import Spinner from "../atoms/spinner"

type PrivateRouteProps = {
  children: ReactNode
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const account = useContext(AccountContext)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    account
      .session()
      .then(() => {
        setLoading(false)
      })
      .catch(() => {
        navigate("/login")
      })
  }, [])

  if (account.isLoggedIn && !loading) {
    return <>{children}</>
  }

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <Spinner variant="secondary" />
    </div>
  )
}

export default PrivateRoute
