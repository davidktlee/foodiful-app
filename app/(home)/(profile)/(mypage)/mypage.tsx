import { Text, View } from '@/components/Themed'
import { Link, router } from 'expo-router'
import { Animated, Platform, TouchableOpacity } from 'react-native'
import { useUserStore } from '@/components/util/userStorage'
import { useAuth } from '@/components/auth/hooks/useAuth'
import { useEffect, useRef } from 'react'

export default function MypageScreen() {
  const { user } = useUserStore()
  const { signOut } = useAuth()
  const refAnimation = useRef(new Animated.Value(-280)).current

  useEffect(() => {
    Animated.timing(refAnimation, {
      toValue: 0,
      delay: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start()
  }, [refAnimation, router])

  return (
    <View className="flex-1 justify-center items-center gap-y-2 bg-white p-[6px]">
      <View className="w-full flex-row justify-center border-2 rounded-md border-gray-100 py-4 shadow-sm">
        <View className="w-[90%] flex-row items-center justify-between  px-2">
          <View className="flex-row items-center gap-x-2">
            <Animated.View style={{ transform: [{ translateX: refAnimation }] }}>
              <Text className="text-xl text-main font-bold">{user?.name}</Text>
            </Animated.View>
            <Text className="text-lg">님, 어서오세요</Text>
          </View>
          <View className="flex-row gap-x-2">
            <TouchableOpacity
              className="border-main border-[1px] rounded-md h-7 px-2 flex-row items-center"
              onPress={() => router.push('/(home)/(mypage)/mypagemodify')}
            >
              <Text className="text-sm">수정</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View className="flex-1 w-full gap-y-5 p-[6px] border-2 border-gray-100 rounded-md shadow-md">
        <View
          className={`flex-row justify-center shadow-sm ml-4 text-base ${
            Platform.OS === 'android' && ' shadow-black'
          } py-2 rounded-lg`}
        >
          <Link href="/(home)/(mypage)/myreview" className="w-full text-center">
            주문/배송 내역
          </Link>
        </View>

        <View
          className={`flex-row justify-center shadow-sm py-2 ml-4 text-base ${
            Platform.OS === 'android' && ' shadow-black'
          } rounded-lg`}
        >
          <Link href="/(home)/(mypage)/myreservation" className="w-full text-center">
            내 예약목록
          </Link>
        </View>
        <View
          className={`flex-row justify-center shadow-sm py-2 ml-4 text-base ${
            Platform.OS === 'android' && ' shadow-black'
          } rounded-lg`}
        >
          <Link href="/(home)/(mypage)/myfavoriteproduct" className="w-full text-center">
            상품 좋아요
          </Link>
        </View>
        <View
          className={`flex-row justify-center shadow-sm py-2 ml-4 text-base ${
            Platform.OS === 'android' && ' shadow-black'
          } rounded-lg`}
        >
          <Link href="/(home)/(mypage)/myfavoritelecture" className="w-full text-center">
            클래스 좋아요
          </Link>
        </View>
        <View
          className={`flex-row justify-center shadow-sm py-2 ml-4 text-base ${
            Platform.OS === 'android' && ' shadow-black'
          } rounded-lg`}
        >
          <Link href="/(home)/(mypage)/myorder" className="w-full text-center">
            내 후기 내역
          </Link>
        </View>
        <View
          className={`flex-row justify-center shadow-sm py-2 ml-4 text-base ${
            Platform.OS === 'android' && ' shadow-black'
          } rounded-lg`}
        >
          <Link href="/(home)/(mypage)/myrefund" className="w-full text-center">
            취소/교환/반품 내역
          </Link>
        </View>
        <TouchableOpacity className="ml-2 px-2 flex-row items-center" onPress={signOut}>
          <Text className="text-gray-500">로그아웃</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
