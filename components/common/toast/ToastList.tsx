import { useAtomValue } from 'jotai'
import ToastItem from './ToastItem'
import { toast } from '@/store/toastStore'
import { View } from '@/components/Themed'

const ToastList = () => {
  const toasts = useAtomValue(toast)

  return (
    <View className="fixed bottom-0 z-[10]">
      {!!toasts.length && toasts.map((toast) => <ToastItem key={toast.id} {...toast} />)}
    </View>
  )
}

export default ToastList
