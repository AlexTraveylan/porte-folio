"use client"

import { Button } from "@/components/ui/button"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { combinaison } from "@/lib/constants"
import { useSecretStore } from "@/lib/store"
import { Lock, X } from "lucide-react"
import { useEffect, useState } from "react"

export default function SecretLock() {
  const {
    isSecretModalOpen,
    isSecretUnlocked,
    openSecretModal,
    closeSecretModal,
    unlockSecret,
  } = useSecretStore()
  const [otpValue, setOtpValue] = useState("")
  const [showLock, setShowLock] = useState(false)
  const [lockPosition, setLockPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (isSecretUnlocked) return

    const interval = setInterval(() => {
      setLockPosition({
        x: Math.random() * (window.innerWidth - 50),
        y: Math.random() * (window.innerHeight - 50),
      })
      setShowLock(true)

      setTimeout(() => {
        setShowLock(false)
      }, 1000)
    }, 3000)

    return () => clearInterval(interval)
  }, [isSecretUnlocked])

  useEffect(() => {
    if (otpValue.length === 6) {
      if (otpValue === combinaison) {
        unlockSecret()
      } else {
        setOtpValue("")
        setTimeout(() => {
          closeSecretModal()
        }, 1000)
      }
    }
  }, [otpValue, unlockSecret, closeSecretModal])

  return (
    <>
      {/* Floating Lock Icon */}
      {showLock && !isSecretModalOpen && !isSecretUnlocked && (
        <div
          className="fixed cursor-pointer hover:scale-110 transition-transform duration-200"
          style={{
            left: lockPosition.x,
            top: lockPosition.y,
            zIndex: 99999,
          }}
          onClick={openSecretModal}
        >
          <div className="bg-primary/20 backdrop-blur-sm rounded-full p-3 shadow-lg animate-pulse">
            <Lock className="h-6 w-6 text-primary" />
          </div>
        </div>
      )}

      {/* Secret Modal */}
      {isSecretModalOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-[100000]">
          <div className="bg-card border border-border p-8 rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="flex justify-end mb-6">
              <Button
                variant="ghost"
                size="sm"
                onClick={closeSecretModal}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex justify-center">
              <InputOTP maxLength={6} value={otpValue} onChange={setOtpValue}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                </InputOTPGroup>
                <InputOTPGroup>
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                </InputOTPGroup>
                <InputOTPGroup>
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
