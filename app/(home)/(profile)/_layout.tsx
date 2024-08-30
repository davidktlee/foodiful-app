import { useUserStore } from '@/components/util/userStorage'
import { Stack, Tabs } from 'expo-router'
import SignInScreen from './signin'
import ProfileScreen from './profile'

export default function ProfileLayoutNav() {
  const { user } = useUserStore()
  if (user) {
    return (
      <Stack>
        <Stack.Screen name="profile" options={{ title: '프로필' }} />
      </Stack>
    )
  } else
    return (
      <Stack>
        <Stack.Screen name="signin" options={{ title: '로그인' }} />
        <Stack.Screen name="signup" options={{ title: '회원 가입' }} />
      </Stack>
    )
}
