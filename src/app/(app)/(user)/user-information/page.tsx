"use client"

import StudentInfoForm from "@/src/components/StudentInfoForm"
import { useUpdateAccount } from "@/src/services/AccountServices"
import { useUser } from "@/src/stores/tokenStore"
import { DecodedToken } from "@/src/utils/jwt"
import React from "react"

const page = () => {
  const { mutate: updateAccount } = useUpdateAccount()
  const { sub, name } = useUser() as DecodedToken

  const onComplete = (data: any) => {
    updateAccount(
      { id: sub || "", data: { ...data, name: name || "" } },
      {
        onSuccess: () => {
          console.log("Update account successfully")
        },
        onError: () => {
          console.log("Update account failed")
        },
      }
    )
  }

  return (
    <div>
      <StudentInfoForm onConfirm={onComplete} />
    </div>
  )
}

export default page
