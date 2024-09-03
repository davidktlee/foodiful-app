import { Text, View } from '@/components/Themed'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function MyFavoriteScreen() {
  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-white">
      <Text>좋아요</Text>
    </SafeAreaView>
  )
}
