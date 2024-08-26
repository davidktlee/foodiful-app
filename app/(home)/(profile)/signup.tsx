import { Text, View } from '@/components/Themed'
import { useInput } from '@/components/common/hooks/useInput'
import { Link, router } from 'expo-router'
import { TextInput, TouchableOpacity } from 'react-native'

export default function SignUpScreen() {
  const { state: email, onChangeInput: onChangeEmail } = useInput()
  const { state: name, onChangeInput: onChangeName } = useInput()
  const { state: password, onChangeInput: onChangePassword } = useInput()
  const { state: phone, onChangeInput: onChangePhone } = useInput()

  const onClickSignUp = () => {}
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-main text-4xl font-extrabold mb-10">Foodiful</Text>
      <View className="w-[80%] flex-row items-center gap-x-2 my-4">
        <Text className="mr-3">이메일</Text>
        <TextInput
          className="w-[70%] border-b-2 border-gray-300 h-6"
          placeholder="이메일을 입력해주세요"
          value={email}
          onChange={onChangeEmail}
        />
      </View>
      <View className="w-[80%] flex-row items-center gap-x-2 my-4">
        <Text className="mr-6">이름</Text>
        <TextInput
          className="w-[70%] border-b-2 border-gray-300 h-6"
          placeholder="이름을 입력해주세요"
          value={name}
          onChange={onChangeName}
        />
      </View>
      <View className="w-[80%] flex-row items-center gap-x-2 my-4">
        <Text className="">패스워드</Text>
        <TextInput
          className="w-[70%] border-b-2 border-gray-300 h-6"
          placeholder="패스워드를 입력해주세요"
          value={password}
          secureTextEntry
          onChange={onChangePassword}
        />
      </View>
      <View className="w-[80%] flex-row items-center gap-x-2 my-4 relative">
        <Text className="mr-3">휴대폰</Text>
        <TextInput
          className="w-[70%] border-b-2 border-gray-300 h-6"
          placeholder="예시) 01012341234"
          value={phone}
          keyboardType="number-pad"
          onChange={onChangePhone}
        />
      </View>
      <TouchableOpacity
        onPress={() => console.log(email, password)}
        className="border-2 border-main rounded-md my-4 w-[80%] flex-row justify-center"
      >
        <Text className="text-lg rounded-md">회원가입</Text>
      </TouchableOpacity>
      <Link href="/(profile)/signin">
        <Text className="text-lg text-gray-600 rounded-md">로그인</Text>
      </Link>
    </View>
  )
}
