import styles from './Task.module.css'
import { Trash } from 'phosphor-react'
import { useEffect, useState } from 'react';
import notCheckedImg from '../assets/checked-false-hover-false.svg'
import checkedImg from '../assets/checked-true-hover-false.svg'

export interface ITaskProps {
  id?:string;
  content:string;
  checked:boolean;
  onDelete?:(content:string)=>void;
  onCheck?:(content:boolean)=>void
}

const Task = ({id, content, onDelete,onCheck, checked}:ITaskProps) => {
  const [isChecked, setIsChecked] = useState(checked)

  const handleDelete = () => {

    if(onDelete && id){
      onDelete(id)
    }

    if(isChecked){
      onCheck(false)
    }
  }

  const handleCheckTask = () => {
    setIsChecked(prev => !prev)
    if(!isChecked){
      onCheck(true)
    }
    if(isChecked){
      onCheck(false)
    }
  }

  const checkedStyle = isChecked ? `${styles.container} ${styles.checked}` : `${styles.container}`

  return (
    <div className={checkedStyle} >
      <div className={styles.content} onClick={handleCheckTask}>
        {!isChecked ? <img src={notCheckedImg}/> : <img src={checkedImg}/> }
        <p className={styles.textContent}>{content}</p>
      </div>
      <button className={styles.buttonDelete} onClick={handleDelete}>
        <Trash size={20}/>
      </button>
  </div>
  )
}

export default Task