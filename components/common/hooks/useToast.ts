import { Toast, toast } from '@/store/toastStore'
import { useAtom } from 'jotai'

const getRandomId = () => String(new Date().getTime())

const useToast = () => {
  const [toastValue, setToastValue] = useAtom(toast)

  const removeToast = (toastId: Toast['id']) => {
    setToastValue((prev) => prev.filter((toast) => toast.id === toastId))
  }

  const fireToast = (toast: Toast) => {
    setToastValue((prev) => [...prev, { ...toast, id: getRandomId() }])
    setTimeout(() => removeToast(toast.id), 600 + (toast.timer ?? 1000))
  }

  return { toastValue, fireToast }
}

export default useToast
