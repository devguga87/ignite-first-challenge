import styles from './Task.module.css'
import { Trash } from 'phosphor-react'
import { useEffect, useState } from 'react';
import notCheckedImg from '../assets/checked-false-hover-false.svg'
import checkedImg from '../assets/checked-true-hover-false.svg'

interface TaskProps {
  content:string;
  onDelete:(content:string)=>void,
  onCheck:(content:boolean)=>void
}

const Task = ({ content, onDelete,onCheck}:TaskProps) => {
  const [checked, setChecked] = useState(false)

  const handleDelete = () => {
    onDelete(content)

    if(checked){
      onCheck(false)
    }
  }

  const handleCheckTask = () => {
    setChecked(prev => !prev)
    if(!checked){
      onCheck(true)
    }
    if(checked){
      onCheck(false)
    }
  }

  const checkedStyle = checked ? `${styles.container} ${styles.checked}` : `${styles.container}`

  return (
    <div className={checkedStyle} >
      <div className={styles.content} onClick={handleCheckTask}>
        {!checked ? <img src={notCheckedImg}/> : <img src={checkedImg}/> }
        <p className={styles.textContent}>{content}</p>
      </div>
      <button className={styles.buttonDelete} onClick={handleDelete}>
        <Trash size={20}/>
      </button>
  </div>
  )
}

export default Task