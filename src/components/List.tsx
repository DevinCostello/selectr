import { useState } from 'react'
import styles from '../styles/List.module.css'
import ListItem from './ListItem'

interface ListProps  {
  title: string
  list: string[]
  selectedItem: number | null
  AddItem(list: string[], item: string): void 
  DeleteItem(selectedItem: number | null): void
  setSelectedItem: React.Dispatch<React.SetStateAction<number | null>>
  RandomNumber(): number
}



const List = ({title, list, selectedItem}: ListProps) => {

  const [item, setItem] = useState<string>("");
  
  return (
    <main className={styles.container}>
    <h2>{title}</h2>

    <ul>

    {list.map((item, index)=> 

    <ListItem item={item} index={index} selectedItem={selectedItem}/>
    
    )}

    </ul>

    

<form className={styles.listform} action="submit" onSubmit={(e) => e.preventDefault()}>
    <input type="text" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setItem(e.target.value)} />
    <button>Add</button>
    <button>Remove Selected</button>
    <button>Choose Random</button>
</form>

    </main>
  )
}

export default List