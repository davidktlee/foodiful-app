import { Text, View } from '@/components/Themed'
import { useAuth } from '@/components/auth/hooks/useAuth'
import usePhoneVerfiy from '@/components/auth/hooks/usePhoneVerify'
import { useValidate } from '@/components/auth/hooks/useValidate'
import Input from '@/components/common/Input'
import { useInput } from '@/components/common/hooks/useInput'
import { calPhoneVerifyTime } from '@/components/util/getTimes'
import { isAxiosError } from 'axios'
import { Link } from 'expo-router'
import { useEffect, useState } from 'react'
import { TextInput, TouchableOpacity } from 'react-native'
import Toast from 'react-native-toast-message'

export default function SignUpScreen() {
  const { state: email, setState: setEmail, onChangeInput: onChangeEmail } = useInput()
  const { state: name, setState: setName, onChangeInput: onChangeName } = useInput()
  const { state: password, setState: setPassword, onChangeInput: onChangePassword } = useInput()
  const { state: phone, setState: setPhone, onChangeInput: onChangePhone } = useInput()
  const { state: verify, setState: setVerify, onChangeInput: onChangePhoneVerify } = useInput()
  const [isSignUpDisabled, setIsSignUpDisabled] = useState(true)
  const { emailValidate, passwordValidate } = useValidate()
  const {
    checkExistPhone,
    checkVerifySms,
    isClickedVerifyPhone,
    isExistPhoneNumber,
    isPhoneInputDisabled,
    isVerifiedPhone,
    sendVerifySms,
    setIsClickedVerifyPhone,
    setIsExistPhoneNumber,
    setIsPhoneInputDisabled,
    verifyExpiredTxt,
    setTime,
    setVerifyExpiredTxt,
    time,
  } = usePhoneVerfiy()
  const { signUp } = useAuth()

  useEffect(() => {
    if (!!time) {
      const count = setInterval(() => {
        setTime((prev) => prev - 1)
      }, 1000)
      if (time === 1) {
        setIsClickedVerifyPhone(false)
        setIsPhoneInputDisabled(false)
        setVerifyExpiredTxt('인증번호를 다시 요청해주세요')
      }
      return () => clearInterval(count)
    }
  }, [time])

  useEffect(() => {
    if (phone.length === 11) {
      setVerifyExpiredTxt('')
      checkExistPhone(phone)
    } else {
      setIsExistPhoneNumber(false)
    }
  }, [phone])

  useEffect(() => {
    if (isVerifiedPhone && emailValidate(email) && passwordValidate(password) && name)
      setIsSignUpDisabled(false)
    else setIsSignUpDisabled(true)
  }, [isVerifiedPhone, email, password, name])

  const onClickSignUp = () => {
    try {
      signUp({ email, name, password, phone, verify })
      setEmail('')
      setName('')
      setPassword('')
      setPhone('')
    } catch (error) {
      if (isAxiosError(error)) {
        Toast.show({
          type: 'error',
          text1: '회원가입에 실패했습니다.',
          text2: error.response?.data.message,
          visibilityTime: 2000,
          position: 'bottom',
        })
      }
    }
  }
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-main text-4xl font-extrabold mb-10">FOODIFUL</Text>
      <Input
        containerStyle="w-[80%] gap-x-2 my-2"
        labelName="이메일"
        labelStyle="mr-3"
        style="w-[70%] border-b-2 border-gray-300 h-6"
        placeholder="이메일을 입력해주세요"
        value={email}
        type="email-address"
        onChange={onChangeEmail}
        validate={emailValidate}
        errorText="이메일 형식을 확인해주세요."
      />
      <Input
        containerStyle="w-[80%] gap-x-2 my-2"
        labelName="이름"
        labelStyle="mr-6"
        style="w-[70%] border-b-2 border-gray-300 h-6"
        placeholder="이름을 입력해주세요"
        value={name}
        type="name-phone-pad"
        onChange={onChangeName}
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
      <View className="w-[80%] flex-row items-center gap-x-2 my-4 relative">
        <Text className="mr-3">휴대폰</Text>
        <TextInput
          editable={!isPhoneInputDisabled}
          className="w-[70%] border-b-2 border-gray-300 h-6"
          placeholder="예시) 01012341234"
          value={phone}
          keyboardType="number-pad"
          onChange={onChangePhone}
          maxLength={11}
        />
        <TouchableOpacity
          disabled={isExistPhoneNumber || phone.length !== 11 || isVerifiedPhone}
          className="absolute right-8"
          onPress={async () => {
            setIsClickedVerifyPhone(true)
            sendVerifySms(phone)
            setIsPhoneInputDisabled(true)
            setTime(180)
          }}
        >
          <Text
            className={`text-base ${
              !isExistPhoneNumber && phone.length === 11 && !isVerifiedPhone
                ? 'text-black'
                : 'text-gray-300'
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
        onPress={onClickSignUp}
        disabled={isSignUpDisabled}
        className={`border-2 border-main rounded-md py-1 my-4 w-[80%] flex-row justify-center ${
          isSignUpDisabled && 'bg-gray-200 border-gray-200'
        }`}
      >
        <Text className="text-lg rounded-md">회원가입</Text>
      </TouchableOpacity>
      <Link href="/(profile)/signin">
        <Text className="text-lg text-gray-600 rounded-md py-1">로그인</Text>
      </Link>
    </View>
  )
}
