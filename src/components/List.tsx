import { useState } from 'react'
import styles from '../styles/List.module.css'
import ListItem from './ListItem'

interface ListProps  {
  title: string
  list: string[]
  // selectedItem: number | null
  // AddItem(list: string[], item: string): void 
  // DeleteItem(selectedItem: number | null): void
  // RandomNumber(): number
  // setSelectedItem: React.Dispatch<React.SetStateAction<number | null>>
}



const List = ({ title }: { title: string }) => {

  const [item, setItem] = useState<string>("");
  const [list, setList] = useState<string[]>([]);
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  
  const DeleteItem = (selectedItem: number | null): void => {
    setList(list.filter((item, index) => index !== selectedItem));
  };
  
  const AddItem = (list: string[], item: string) => {
    setList([...list, item]);
    setItem("");
  };
  
  const RandomNumber = (): number => {
    return Math.floor(Math.random() * list.length);
  };
  
  return (
    <main className={styles.container}>
    <h2>{title}</h2>

    <ul>

    {list.map((item, index)=> 

    <ListItem key={index} item={item} index={index} selectedItem={selectedItem}/>
    
    )}

    </ul>

    

<form className={styles.listform} action="submit" onSubmit={(e) => e.preventDefault()}>
    <input value={item} type="text" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setItem(e.target.value)} />
    <button onClick={(e) => AddItem(list, item)}>Add</button>
    <button onClick={() => DeleteItem(selectedItem)}>Delete Selection</button>
    <button onClick={() => setSelectedItem(RandomNumber())}>Choose Random</button>
</form>

    </main>
  )
}

export default List