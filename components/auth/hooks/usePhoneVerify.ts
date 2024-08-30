import axios from 'axios'
import { useState } from 'react'
import { api } from '../../axios/axiosInstance'
import Toast from 'react-native-toast-message'

/**
 * 핸드폰 번호 수정 눌렀을 때 번호 input able
 * 취소 했을 때 input disable 및 초기 상태로 돌아감
 * 인증 눌렀을 때 번호 존재한다면, 에러 텍스트만 띄우고 변경 없음
 * 인증 눌렀을 때 번호 존재x, 인증번호 창과 확인 버튼 등 띄우기
 * 취소 눌렀을 때는 다시 초기 상태로
 * 재시도 눌렀을 떄는 시간만 초기화
 */

const usePhoneVerfiy = () => {
  // input disable 여부
  const [isPhoneInputDisabled, setIsPhoneInputDisabled] = useState(false)
  // 존재하는 번호인지 여부
  const [isExistPhoneNumber, setIsExistPhoneNumber] = useState(false)
  // 번호 체크 후 에러 메시지
  const [phoneCheckErrorMsg, setPhoneCheckErrorMsg] = useState('')
  // 인증 버튼 눌렀는지 여부
  const [isClickedVerifyPhone, setIsClickedVerifyPhone] = useState(false)
  // 검증 시간
  const [time, setTime] = useState(0) // 남은 시간 (단위: 초)
  // 만료 시 텍스트
  const [verifyExpiredTxt, setVerifyExpiredTxt] = useState('')
  // 핸드폰 인증 여부
  const [isVerifiedPhone, setIsVerifiedPhone] = useState(false)

  const checkExistPhone = async (phone: string) => {
    try {
      const res = await api.get(`/auth/checkphone/exists?phone=${phone}`)

      if (res) setIsExistPhoneNumber(false)
      isClickedVerifyPhone && setTime(180)
      return true
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error?.response?.status === 409) {
          setIsExistPhoneNumber(true)
        }
      }
    }
  }

  const sendVerifySms = async (phone: string) => {
    try {
      if (!isExistPhoneNumber) {
        await api.post('/auth/checkphone', {
          phoneNumber: phone,
        })

        setVerifyExpiredTxt('')
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        Toast.show({
          type: 'error',
          text1: '전송 오류입니다. 잠시 후 다시 시도해주세요.',
          position: 'bottom',
          visibilityTime: 2000,
        })
      }
      setTime(0)
      setIsPhoneInputDisabled(false)
      setIsClickedVerifyPhone(false)
    }
  }

  const checkVerifySms = async (phone: string, verify: string, resetPhone: () => void) => {
    try {
      const res = await api.post('/auth/checkphone/verify', {
        data: {
          phoneNumber: phone,
          verifyCode: verify,
        },
      })
      if (res) {
        Toast.show({
          type: 'success',
          text1: '인증이 완료되었습니다',
          position: 'bottom',
          visibilityTime: 2000,
        })
      }
      setIsVerifiedPhone(true)
      setIsClickedVerifyPhone(false)
      setIsPhoneInputDisabled(true)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error?.response?.status === 401) {
          Toast.show({
            type: 'error',
            text1: '인증에 실패했습니다.',
            position: 'bottom',
            visibilityTime: 2000,
          })
          setIsVerifiedPhone(false)
          setIsClickedVerifyPhone(false)
          resetPhone()
          setIsPhoneInputDisabled(false)
          setVerifyExpiredTxt('인증번호 오류입니다. 다시 시도해주세요')
        } else if (error?.response?.status === 404) {
          Toast.show({
            type: 'error',
            text1: '인증번호가 만료되었습니다.',
            position: 'bottom',
            visibilityTime: 2000,
          })
          setIsVerifiedPhone(false)
          setIsClickedVerifyPhone(false)
          resetPhone()
          setIsPhoneInputDisabled(false)
          setVerifyExpiredTxt('인증번호가 만료되었습니다.')
        }
      }
    }
  }

  return {
    sendVerifySms,
    checkExistPhone,
    checkVerifySms,
    setVerifyExpiredTxt,
    setIsClickedVerifyPhone,
    setIsExistPhoneNumber,
    setPhoneCheckErrorMsg,
    setTime,
    setIsPhoneInputDisabled,
    setIsVerifiedPhone,
    time,
    isVerifiedPhone,
    verifyExpiredTxt,
    isClickedVerifyPhone,
    isExistPhoneNumber,
    phoneCheckErrorMsg,
    isPhoneInputDisabled,
  }
}
export default usePhoneVerfiy
