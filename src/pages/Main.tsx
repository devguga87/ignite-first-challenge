import { FormEvent, SetStateAction, useState } from "react"
import Input from "../components/Input"
import Task, { ITaskProps } from "../components/Task"
import styles from './Main.module.css'

import logoImage from '../assets/logo.svg'
import noContentImage from '../assets/clipboard.svg'
import plusImage from '../assets/plus.svg'

const Main = () => {
  const [tasks, setTasks] = useState<ITaskProps[]>([])
  const [newTask, setNewTask] = useState<string>('')
  const [checkedCount, setCheckedCount] = useState(0)

  const formIsValid = newTask.trim().length !== 0

  const handleUpdateCheckedCount = (soma:boolean) => {
    if(soma){
      setCheckedCount(prev => prev + 1)
    }else {
      setCheckedCount(prev => prev - 1)
    }
  }

  const deleteTask = (id:string) => {
    setTasks(prev => prev.filter(item => item.id !== id))
  }

  const handleCreateTask = (event: { target: { value: SetStateAction<string> } })=>{
    setNewTask(event.target.value)
  }

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault()

    if(!formIsValid){
      return
    }

    const novaTask = {id:String(Math.random()), content:newTask, checked:false}

    setTasks(prev => [novaTask,...prev])
    setNewTask('')
  }

  return (
    <div>
      <header className={styles.header}>
        <img src={logoImage} />
      </header>
      <div className={styles.content}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <Input value={newTask} onChange={handleCreateTask} placeholder='Adicione uma nova tarefa'/>
          <button className={styles.buttonSubmit} type='submit' disabled={!formIsValid}>Criar <img src={plusImage} /></button>
        </form>
        <div>
          <div className={styles.tasksHeader}>
            <div className={styles.contador}><p className={styles.createdTasks}>Tarefas criadas </p> <span>{tasks.length}</span></div>
            <div className={styles.contador}><p className={styles.concludedTasks}>Concluidas </p><span>{checkedCount} de {tasks.length}</span></div>
          </div>
            {tasks.length > 0 ? <div className={styles.tasksContainer}>
            {tasks.map(task => <Task key={task.id} id={task.id} content={task.content} checked={task.checked} onDelete={deleteTask} onCheck={handleUpdateCheckedCount}/>)}
          </div> : (
            <div className={styles.noContentContainer}>
              <img src={noContentImage} alt="" />
              <p className={styles.important}>Você ainda não tem tarefas cadastradas</p>
              <p className={styles.normal}>Crie tarefas e organize seus itens a fazer</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Main