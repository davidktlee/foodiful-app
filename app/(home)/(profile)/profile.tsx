import EditScreenInfo from '@/components/EditScreenInfo'
import { Text, View } from '@/components/Themed'
import Auth from '@/app/(home)/(profile)/signin'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function ProfileScreen() {
  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-white">
      <Text>안녕</Text>
    </SafeAreaView>
  )
}
