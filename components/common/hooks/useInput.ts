import { useState } from 'react'
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native'

export const useInput = () => {
  const [state, setState] = useState('')

  const onChangeInput = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    const { text } = e.nativeEvent
    setState(text)
  }

  return {
    state,
    setState,
    onChangeInput,
  }
}
