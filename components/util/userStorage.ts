import { User } from '@/types/user'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

const USER_STORAGE = 'user-storage'

interface UserStoreType {
  user: User | null
  setUser: (userData: User) => void
}

export const useUserStore = create<UserStoreType>()(
  persist(
    (set) => ({
      user: null,
      setUser: async (user: User) => {
        set({ user })
      },
    }),
    {
      name: USER_STORAGE,
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)

export const userStorage = {
  getUser: async () => {
    const value = await AsyncStorage.getItem(USER_STORAGE)
    return value ? JSON.parse(value) : null
  },
  setUser: async (value: User) => {
    await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(value))
  },
  removeUser: async () => {
    await AsyncStorage.removeItem(USER_STORAGE)
  },
}

// zustand를 이용해서 유저 로그인 유지시키는 방법 사용해보기
