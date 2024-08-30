import { Text, View } from '@/components/Themed'
import usePhoneVerfiy from '@/components/auth/hooks/usePhoneVerify'
import { useInput } from '@/components/common/hooks/useInput'
import { calPhoneVerifyTime } from '@/components/util/getTimes'
import { Link, router } from 'expo-router'
import { useEffect } from 'react'
import { TextInput, TouchableOpacity } from 'react-native'

export default function SignUpScreen() {
  const { state: email, onChangeInput: onChangeEmail } = useInput()
  const { state: name, onChangeInput: onChangeName } = useInput()
  const { state: password, onChangeInput: onChangePassword } = useInput()
  const { state: phone, onChangeInput: onChangePhone } = useInput()
  const { state: verify, setState: setVerify, onChangeInput: onChangePhoneVerify } = useInput()
  const {
    checkExistPhone,
    checkVerifySms,
    isClickedVerifyPhone,
    isExistPhoneNumber,
    isPhoneInputDisabled,
    isVerifiedPhone,
    phoneCheckErrorMsg,
    sendVerifySms,
    setIsClickedVerifyPhone,
    setIsExistPhoneNumber,
    setIsPhoneInputDisabled,
    verifyExpiredTxt,
    setIsVerifiedPhone,
    setTime,
    setVerifyExpiredTxt,
    time,
  } = usePhoneVerfiy()

  useEffect(() => {
    if (!!time) {
      const count = setInterval(() => {
        setTime((prev) => prev - 1)
      }, 1000)
      if (time === 1) {
        setVerifyExpiredTxt('인증번호를 다시 요청해주세요')
        setIsClickedVerifyPhone(false)
      }
      return () => clearInterval(count)
    }
  }, [time])

  useEffect(() => {
    if (phone.length === 11) {
      checkExistPhone(phone)
    } else {
      setIsExistPhoneNumber(false)
    }
  }, [phone])

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
          editable={!isPhoneInputDisabled}
          className="w-[70%] border-b-2 border-gray-300 h-6"
          placeholder="예시) 01012341234"
          value={phone}
          keyboardType="number-pad"
          onChange={onChangePhone}
        />
        <TouchableOpacity
          disabled={isExistPhoneNumber || phone.length !== 11}
          className="absolute right-8"
          onPress={async () => {
            setIsClickedVerifyPhone(true)
            sendVerifySms(phone)
            setIsPhoneInputDisabled(true)
            setTime(100)
          }}
        >
          <Text
            className={`text-base ${
              !isExistPhoneNumber && phone.length === 11 ? 'text-black' : 'text-gray-300'
            }`}
          >
            인증
          </Text>
        </TouchableOpacity>
      </View>
      <Text className="h-5 text-red-500">
        {isExistPhoneNumber && '존재하는 휴대폰 번호입니다.'}
      </Text>
      {isClickedVerifyPhone && (
        <>
          <View className="flex-row gap-x-2">
            <Text className="py-1">인증번호</Text>
            <TextInput
              className="border-b-2 border-gray-300 w-[20%] px-1"
              value={verify}
              onChange={onChangePhoneVerify}
            />
            <Text className="py-1 mx-2 text-gray-700">{`${Math.floor(
              time / 60
            )} : ${calPhoneVerifyTime(time)}`}</Text>
            <TouchableOpacity
              className="border-2 border-main bg-main p-1 rounded-md"
              onPress={() => {
                checkVerifySms(phone, verify, () => setVerify(''))
              }}
            >
              <Text className="text-white font-semibold">확인</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="border-2 border-gray-400 p-1 rounded-md"
              onPress={() => {
                setIsClickedVerifyPhone(false)
                setIsExistPhoneNumber(false)
                setTime(0)
              }}
            >
              <Text className="font-semibold">취소</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
      <View>
        <Text className="text-red-500">{verifyExpiredTxt}</Text>
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
