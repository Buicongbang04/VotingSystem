"use client"

import StudentInfoForm from "@/src/components/StudentInfoForm"
import { useUpdateAccount } from "@/src/services/AccountServices"
import { useUser } from "@/src/stores/tokenStore"
import { DecodedToken } from "@/src/utils/jwt"
import { useRouter } from "next/navigation"
import React from "react"

const page = () => {
  const { mutate: updateAccount } = useUpdateAccount()
  const { sub, name } = useUser() as DecodedToken
  const router = useRouter()

  const onComplete = (data: any) => {
    updateAccount(
      { id: sub || "", data: { ...data, name: name || "" } },
      {
        onSuccess: () => {
          router.push("/all-show")
        },
        onError: () => {
          console.log("Update account failed")
        },
      }
    )
  }

  const onCancel = () => {
    router.back()
  }

  return (
    <div>
      <StudentInfoForm onConfirm={onComplete} onCancel={onCancel} />
    </div>
  )
}

export default page
