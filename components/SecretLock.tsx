"use client"

import { Button } from "@/components/ui/button"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { combinaison, lockAppearanceIntervalMs } from "@/lib/constants"
import { useSecretStore } from "@/lib/store"
import { useI18n } from "@/locales/client"
import { Lock, X } from "lucide-react"
import { useEffect, useState } from "react"

export default function SecretLock() {
  const t = useI18n()
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
    }, lockAppearanceIntervalMs)

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
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-[100000] animate-in fade-in-0 duration-300">
          <div className="bg-background border border-border/50 p-8 rounded-xl shadow-2xl max-w-md w-full mx-4 animate-in slide-in-from-bottom-4 duration-300">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Lock className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  {t("secret.modal.title")}
                </h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={closeSecretModal}
                className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Message */}
            <div className="text-center mb-6">
              <p className="text-sm text-muted-foreground">
                {t("secret.modal.description")}
              </p>
            </div>

            {/* OTP */}
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-muted/30 rounded-lg border border-border/30">
                <InputOTP maxLength={6} value={otpValue} onChange={setOtpValue}>
                  <InputOTPGroup>
                    <InputOTPSlot
                      index={0}
                      className="border-2 border-border/50 bg-background/50 text-foreground font-mono text-lg h-12 w-12"
                    />
                    <InputOTPSlot
                      index={1}
                      className="border-2 border-border/50 bg-background/50 text-foreground font-mono text-lg h-12 w-12"
                    />
                  </InputOTPGroup>
                  <InputOTPSeparator className="text-muted-foreground" />
                  <InputOTPGroup>
                    <InputOTPSlot
                      index={2}
                      className="border-2 border-border/50 bg-background/50 text-foreground font-mono text-lg h-12 w-12"
                    />
                    <InputOTPSlot
                      index={3}
                      className="border-2 border-border/50 bg-background/50 text-foreground font-mono text-lg h-12 w-12"
                    />
                  </InputOTPGroup>
                  <InputOTPSeparator className="text-muted-foreground" />
                  <InputOTPGroup>
                    <InputOTPSlot
                      index={4}
                      className="border-2 border-border/50 bg-background/50 text-foreground font-mono text-lg h-12 w-12"
                    />
                    <InputOTPSlot
                      index={5}
                      className="border-2 border-border/50 bg-background/50 text-foreground font-mono text-lg h-12 w-12"
                    />
                  </InputOTPGroup>
                </InputOTP>
              </div>
            </div>

            {/* Progress indicator */}
            <div className="flex justify-center gap-1">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className={`h-1 w-4 rounded-full transition-colors duration-200 ${
                    i < otpValue.length
                      ? "bg-primary"
                      : "bg-muted-foreground/20"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
