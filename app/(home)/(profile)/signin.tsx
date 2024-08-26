import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useInput } from '../../../components/common/hooks/useInput'
import { Link, router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import useToast from '@/components/common/hooks/useToast'

export default function SignInScreen() {
  const { fireToast } = useToast()
  const { state: email, onChangeInput: onChangeEmail } = useInput()
  const { state: password, onChangeInput: onChangePassword } = useInput()

  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-white pb-10">
      <Text className="text-main text-4xl font-extrabold mb-10">Foodiful</Text>

      <View className="w-[70%] flex-row items-center gap-x-2 my-4">
        <Text className="mr-3">이메일</Text>
        <TextInput
          className="w-[80%] border-b-2 border-gray-300 h-6"
          placeholder="이메일을 입력해주세요"
          value={email}
          onChange={onChangeEmail}
        />
      </View>
      <View className="w-[70%] flex-row items-center gap-x-2 my-4">
        <Text>패스워드</Text>
        <TextInput
          className="w-[80%] border-b-2 border-gray-300 h-6"
          placeholder="이메일을 입력해주세요"
          value={password}
          secureTextEntry
          onChange={onChangePassword}
        />
      </View>

      <TouchableOpacity
        onPress={() =>
          fireToast({
            id: '문자 전송 오류',
            type: 'failed',
            message: '전송 오류입니다. 잠시 후 다시 시도해주세요.',
            position: 'bottom',
            timer: 2000,
          })
        }
        className="border-2 border-main rounded-md my-4 w-[70%] flex-row justify-center"
      >
        <Text className="text-lg rounded-md">로그인</Text>
      </TouchableOpacity>
      <Link href="/signup">
        <Text className="text-lg text-gray-600 rounded-md">회원가입</Text>
      </Link>
    </SafeAreaView>
  )
}
