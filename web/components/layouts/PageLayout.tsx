import React, { FC, useEffect } from "react"
import { useRouter } from "next/router"
import Header from "../Header"

type PageLayoutProps = {
  fetching?: boolean
  title?: string
  isProtected?: boolean
  children?: React.ReactNode
  containerClassName?: string
  isAdmin?: boolean
}

const PageLayout: FC<PageLayoutProps> = ({
  isProtected,
  children,
  containerClassName,
  isAdmin
}) => {
  const router = useRouter()
  useEffect(() => {
    if (isProtected) {
      router.push("/")
    }
  }, [isProtected, router])

  return (
    <div className={containerClassName || ""}>
      <Header isAdmin={isAdmin} />
      <div className="flex pb-10">{children}</div>
    </div>
  )
}

export default PageLayout;
