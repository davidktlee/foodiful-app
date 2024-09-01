import { useProtectedRoute } from '@/components/common/hooks/useProtectedRoute'
import { useUserStore } from '@/components/util/userStorage'

import { Stack } from 'expo-router'

export default function ProfileLayout() {
  const { user } = useUserStore()

  useProtectedRoute(user)

  return (
    <Stack>
      <Stack.Screen name="signin" options={{ title: '로그인' }} />
      <Stack.Screen name="signup" options={{ title: '회원 가입' }} />
      <Stack.Screen name="(mypage)" options={{ headerShown: false }} />
    </Stack>
  )
}
