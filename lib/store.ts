import { create } from "zustand"

interface SecretState {
  isSecretModalOpen: boolean
  isSecretUnlocked: boolean
  openSecretModal: () => void
  closeSecretModal: () => void
  unlockSecret: () => void
}

export const useSecretStore = create<SecretState>((set) => ({
  isSecretModalOpen: false,
  isSecretUnlocked: false,
  openSecretModal: () => set({ isSecretModalOpen: true }),
  closeSecretModal: () => set({ isSecretModalOpen: false }),
  unlockSecret: () => set({ isSecretUnlocked: true, isSecretModalOpen: false }),
}))
