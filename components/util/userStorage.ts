import { User } from '@/types/user'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

const USER_STORAGE = 'user-storage'

interface UserStoreType {
  user: User | null
  setUser: (userData: User) => void
  removeUser: () => void
}

export const useUserStore = create<UserStoreType>()(
  persist(
    (set) => ({
      user: null,
      setUser: async (user: User) => {
        set({ user })
      },
      removeUser: () => {
        set({ user: null })
      },
    }),
    {
      name: USER_STORAGE,
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)
