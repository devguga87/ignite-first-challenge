import { FormEvent, SetStateAction, useState } from "react"
import Input from "../components/Input"
import Task from "../components/Task"
import styles from './Main.module.css'

import logoImage from '../assets/logo.svg'
import noContentImage from '../assets/clipboard.svg'

const Main = () => {
  const [tasks, setTasks] = useState<string[]>([])
  const [newTask, setNewTask] = useState<string>('')
  const [checkedCount, setCheckedCount] = useState(0)

  const handleUpdateCheckedCount = (soma:boolean) => {
    if(soma){
      setCheckedCount(prev => prev + 1)
    }else {
      setCheckedCount(prev => prev - 1)
    }
  }

  const formIsValid = newTask.trim().length !== 0

  const deleteTask = (content:string) => {
    setTasks(prev => prev.filter(item => item !== content))
  }

  const handleCreateTask = (event: { target: { value: SetStateAction<string> } })=>{
    setNewTask(event.target.value)
  }

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault()
    console.log('submited')

    if(!formIsValid){
      return
    }

    console.log('submited 2')

    setTasks(prev => [...prev,newTask])
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
          <button className={styles.buttonSubmit} type='submit'>Nova</button>
        </form>
        <div>
          <div className={styles.tasksHeader}>
            <div className={styles.contador}><p className={styles.createdTasks}>Tarefas criadas </p> <span>{tasks.length}</span></div>
            <div className={styles.contador}><p className={styles.concludedTasks}>Concluidas </p><span>{checkedCount} de {tasks.length}</span></div>
          </div>
            {tasks.length > 0 ? <div className={styles.tasksContainer}>
            {tasks.map(task => <Task key={task} content={task} onDelete={deleteTask} onCheck={handleUpdateCheckedCount}/>)}
          </div> : (
            <div className={styles.noContentContainer}>
              <img src={noContentImage} alt="" />
              <p className={styles.important}>Você ainda não tem tarefas cadastradas</p>
              <p className={styles.normal}>Crie tarefas e organize seus itens a fazer</p>
            </div>
          )}
        </div>
      </div>
      
      {/* {tasks.map(task => <Task content={task.content}/>)} */}
    </div>
  )
}

export default Main