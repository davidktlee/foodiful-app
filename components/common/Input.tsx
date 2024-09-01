import React, { useEffect, useState } from 'react'
import { Text, View } from '../Themed'
import {
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  TextInput,
  TextInputChangeEventData,
} from 'react-native'

interface PropsType {
  labelName: string
  labelStyle?: string
  containerStyle?: string
  placeholder: string
  style?: string
  value: string
  onChange: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void
  maxLength?: number
  type?: KeyboardTypeOptions
  errorText?: string
  isDisabled?: boolean
  secureTextEntry?: boolean
  validate?: (value: string) => boolean
}

export default function Input({
  labelName,
  labelStyle,
  containerStyle,
  placeholder,
  value,
  onChange,
  errorText,
  isDisabled,
  maxLength,
  style,
  type,
  secureTextEntry,
  validate,
}: PropsType) {
  const [isValidated, setIsValidated] = useState(false)
  const [isBlur, setIsBlur] = useState(false)

  useEffect(() => {
    if (maxLength && maxLength <= value.length) setIsValidated(true)
    else setIsValidated(false)
    return () => {
      setIsValidated(false)
      setIsBlur(false)
    }
  }, [maxLength, value])

  useEffect(() => {
    if (validate && validate(value)) setIsValidated(true)
    else if (validate && !validate(value)) setIsValidated(false)
    return () => {
      setIsValidated(false)
      setIsBlur(false)
    }
  }, [value, validate])

  return (
    <>
      <View className={`flex-row items-center ${containerStyle}`}>
        <Text className={`${labelStyle}`}>{labelName}</Text>
        <TextInput
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={() => setIsBlur(true)}
          onFocus={() => setIsBlur(false)}
          className={`${style} ${isDisabled ? 'bg-gray-200' : 'bg-white'}`}
          keyboardType={type}
          editable={!isDisabled}
          maxLength={maxLength}
          secureTextEntry={secureTextEntry}
        />
      </View>

      <Text className="h-5 text-red-500">{isBlur && !isValidated ? errorText : ''}</Text>
    </>
  )
}
