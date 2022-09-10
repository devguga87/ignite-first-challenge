import styles from './Task.module.css'

import trashImg from '../assets/trash.svg'
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
  const [deleted,setDeleted] = useState(false)

  useEffect(()=>{
    if(deleted && checked){
      onCheck(true)
    }
  },[deleted])

  const handleDelete = () => {
    setDeleted(true)
    onDelete(content)
  }

  const handleCheckTask = () => {
    setChecked(prev => !prev)
    if(!checked && !deleted){
      onCheck(true)
    }
    if(checked && !deleted){
      onCheck(false)
    }
  }

  const checkedStyle = checked ? `${styles.container} ${styles.checked}` : `${styles.container}`

  return (
    <div className={checkedStyle} onClick={handleCheckTask}>
      <div className={styles.content} >
        {!checked ? <img src={notCheckedImg}/> : <img src={checkedImg}/> }
        <p className={styles.textContent}>{content}</p>
      </div>
      <button className={styles.buttonDelete} onClick={handleDelete}>
        <img className={styles.buttonImg} src={trashImg} />
      </button>
  </div>
  )
}

export default Task