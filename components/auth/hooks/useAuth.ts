import axios from 'axios'

import { api } from '../../axios/axiosInstance'
// import { removeStoredUser, setStoreUser } from '../../util/userStorage'
import { PromiseUserType, SignInType, SignUpType, User } from '@/types/user'
import { router } from 'expo-router'
import Toast from 'react-native-toast-message'
import { useUserStore } from '@/components/util/userStorage'

interface UseAuth {
  signIn: (param: SignInType) => void
  signUp: (param: SignUpType) => void
  signOut: () => void
}

export const useAuth = (): UseAuth => {
  const { setUser } = useUserStore()
  const signIn = async ({ email, password }: SignInType) => {
    try {
      const { data } = await api.post<PromiseUserType>('/auth/login', {
        email,
        password,
      })
      if (data) {
        setUser(data.user)
        router.push('/')
        Toast.show({
          type: 'success',
          text1: '로그인이 완료되었습니다.',
          position: 'bottom',
          visibilityTime: 2000,
        })
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        Toast.show({
          type: 'error',
          text1: error.response?.data.message,
          position: 'bottom',
          visibilityTime: 2000,
        })
      }
    }
  }
  const signUp = async ({ email, password, phone, name }: SignUpType) => {
    try {
      const res = await api.post('/auth/signup', { email, name, password, phone })
      if (res) {
        Toast.show({
          type: 'success',
          text1: '회원가입이 완료되었습니다.',
          text2: '로그인 해주세요.',
          position: 'bottom',
          visibilityTime: 2000,
        })

        router.push('/')
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        Toast.show({
          type: 'failed',
          text1: error.response?.data.message,
          position: 'bottom',
          visibilityTime: 2000,
        })
      }
    }
  }
  const signOut = async () => {
    // removeStoredUser()
    const res = await api.post('/auth/logout')
    if (res) {
      Toast.show({
        type: 'success',
        text1: '로그아웃이 완료되었습니다.',
        position: 'bottom',
        visibilityTime: 2000,
      })

      // router.replace('/(홈)')
    }
  }

  return { signIn, signUp, signOut }
}
