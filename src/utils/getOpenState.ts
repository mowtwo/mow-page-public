import type { OpenedState } from "@/global"


export default function getOpenState(): OpenedState {
  const storage = localStorage
  const opened = storage.getItem('opened')
  if (opened) {
    return 'other'
  } else {
    storage.setItem('opened', 'ok')
    return 'first'
  }
}