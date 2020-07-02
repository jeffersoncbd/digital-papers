import { ButtonHTMLAttributes } from 'react'

export interface ButtonInterface<T = HTMLButtonElement>
  extends ButtonHTMLAttributes<T> {
  variant?: 'icon'
}
