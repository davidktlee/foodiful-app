import { Text, View } from '@/components/Themed'
import { Toast } from '@/store/toastStore'
import { useEffect, useState } from 'react'

const ToastItem = ({ message, type, timer, position }: Toast) => {
  const [viewToast, setViewToast] = useState(true)

  useEffect(() => {
    const flag = setTimeout(() => {
      setViewToast(false)
    }, timer)
    return () => {
      clearTimeout(flag)
    }
  }, [timer])

  return (
    <View
      className={`overflow-hidden h-24 w-full fixed bottom-0 left-1/2 -translate-x-1/2 z-[999999]
      ${position === 'bottom' && 'bottom-4'}
      ${position === 'top' && 'top-4'}`}
    >
      {viewToast && type == 'warning' && (
        <View
          className={`w-60 mx-auto text-sm bg-[#f1d732] rounded-md   
          ${position === 'bottom' && 'animate-toast'}
          ${position === 'top' && 'animate-drop'}`}
        >
          <View className=" flex justify-center items-cente">
            <Text className="text-white opacity-90 text-lg mx-2">WARNING!</Text>
          </View>

          <Text className="p-3 break-words text-white text-center">{message}</Text>
        </View>
      )}
      {viewToast && type == 'failed' && (
        <View
          className={`w-60 mx-auto text-sm bg-[#ee2222] rounded-md
          ${position === 'bottom' && 'animate-toast'}
          ${position === 'top' && 'animate-drop'}`}
        >
          <View className=" flex justify-center items-center rounded-t-lg">
            <Text className="text-white opacity-90 text-lg mx-2">FAILED!</Text>
          </View>

          <Text className="p-3 break-words text-white text-center">{message}</Text>
        </View>
      )}
      {viewToast && type == 'success' && (
        <View
          className={`w-60 mx-auto text-sm bg-[#00a120] rounded-md
          ${position === 'bottom' && 'animate-toast'}
          ${position === 'top' && 'animate-drop'}`}
        >
          <View className=" flex justify-center items-center">
            <Text className="text-white opacity-90 text-lg mx-2">SUCCESS!</Text>
          </View>

          <Text className="p-3 break-words text-white text-center">{message}</Text>
        </View>
      )}
      {viewToast && type == 'notice' && (
        <View
          className={`w-60 mx-auto text-sm bg-main rounded-md   
          ${position === 'bottom' && 'animate-toast'}
          ${position === 'top' && 'animate-drop'}`}
        >
          <View className=" flex justify-center items-cente">
            <Text className="text-white opacity-90 text-lg mx-2">NOTICE!</Text>
          </View>

          <Text className="p-3 break-words text-white text-center">{message}</Text>
        </View>
      )}
    </View>
  )
}

export default ToastItem
