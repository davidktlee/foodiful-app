import { User } from '@/types/user'
import { router, useSegments } from 'expo-router'
import { useEffect } from 'react'

export function useProtectedRoute(user: User | null) {
  const segments = useSegments()

  useEffect(() => {
    const inAuthGroup = segments.includes('(profile)' as never)

    if (user === null) {
      // 아직 로딩 중
      return
    }

    if (!user && inAuthGroup) {
      // 로그인되지 않은 상태인데 인증 그룹 내부에 있으면 signin으로 리다이렉트
      router.replace('/(profile)/signin')
    } else if (user && inAuthGroup) {
      router.replace('/(profile)/(mypage)')
    }
  }, [user])
}
