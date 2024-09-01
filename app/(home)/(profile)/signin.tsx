import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useInput } from '../../../components/common/hooks/useInput'
import { Link } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'
import { useValidate } from '@/components/auth/hooks/useValidate'
import { useAuth } from '@/components/auth/hooks/useAuth'
import { isAxiosError } from 'axios'
import Input from '@/components/common/Input'

export default function SignInScreen() {
  const { state: email, setState: setEmail, onChangeInput: onChangeEmail } = useInput()
  const { state: password, setState: setPassword, onChangeInput: onChangePassword } = useInput()
  const { emailValidate, passwordValidate } = useValidate()
  const { signIn } = useAuth()

  const onPressSignIn = () => {
    if (!emailValidate(email) || !passwordValidate(password)) {
      Toast.show({
        type: 'error',
        text1: '이메일 혹은 비밀번호를 확인해주세요.',
        visibilityTime: 2000,
        position: 'bottom',
      })
    }
    try {
      signIn({ email, password })
      setEmail('')
      setPassword('')
    } catch (error) {
      if (isAxiosError(error)) {
        Toast.show({
          type: 'error',
          text1: '로그인에 실패했습니다.',
          text2: error?.response?.data,
          visibilityTime: 2000,
          position: 'bottom',
        })
      }
    }
  }
  return (
    <View className="flex-1 justify-center items-center bg-white pb-10">
      <Text className="text-main text-4xl font-extrabold mb-10">FOODIFUL</Text>
      <Input
        containerStyle="w-[80%] gap-x-2 my-2"
        labelName="이메일"
        labelStyle="mr-3"
        style="w-[70%] border-b-2 border-gray-300 h-6"
        placeholder="이메일을 입력해주세요"
        value={email}
        onChange={onChangeEmail}
        validate={emailValidate}
        errorText="이메일 형식을 확인해주세요."
      />

      <Input
        containerStyle="w-[80%] gap-x-2 my-2"
        labelName="패스워드"
        style="w-[70%] border-b-2 border-gray-300 h-6"
        placeholder="패스워드를 입력해주세요"
        value={password}
        onChange={onChangePassword}
        validate={passwordValidate}
        secureTextEntry
        errorText="패스워드 형식을 확인해주세요."
      />

      <TouchableOpacity
        onPress={onPressSignIn}
        className="border-2 border-main rounded-md my-4 w-[70%] flex-row justify-center py-1"
      >
        <Text className="text-lg rounded-md">로그인</Text>
      </TouchableOpacity>
      <Link href="/signup">
        <Text className="text-lg text-gray-600 rounded-md py-1">회원가입</Text>
      </Link>
    </View>
  )
}
