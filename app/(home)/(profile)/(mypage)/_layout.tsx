import { useUserStore } from '@/components/util/userStorage'
import { Stack, Tabs } from 'expo-router'

export default function MyPageLayoutNav() {
  return (
    <Stack>
      <Stack.Screen name="mypage" options={{ title: '내 정보' }} />
      <Stack.Screen name="mypagemodify" options={{ title: '내 정보 수정' }} />
      <Stack.Screen name="myorder" options={{ title: '주문/배송 내역' }} />
      <Stack.Screen name="myreservation" options={{ title: '예약 내역' }} />
      <Stack.Screen name="myrefund" options={{ title: '취소/교환/반품 내역' }} />
      <Stack.Screen name="myfavoriteproduct" options={{ title: '좋아하는 상품' }} />
      <Stack.Screen name="myfavoritelecture" options={{ title: '좋아하는 클래스' }} />
      <Stack.Screen name="myreview" options={{ title: '내 후기 보기' }} />
    </Stack>
  )
}
