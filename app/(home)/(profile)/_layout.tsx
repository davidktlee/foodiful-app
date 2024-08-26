import { Stack, Tabs } from 'expo-router'

export default function ProfileLayoutNav() {
  const user = ''
  return user ? (
    <Tabs.Screen></Tabs.Screen>
  ) : (
    <Stack>
      <Stack.Screen name="signin" options={{ title: '로그인' }} />
      <Stack.Screen name="signup" options={{ title: '회원 가입' }} />
    </Stack>
  )
}
