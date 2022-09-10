import { InputHTMLAttributes } from "react"
import styles from './Input.module.css'

type InputProps = InputHTMLAttributes<HTMLInputElement>

const Input = ({...props}:InputProps) => {
  return (
    <input className={styles.input} {...props}/>
  )
}

export default Input