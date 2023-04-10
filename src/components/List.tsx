import { useState, useEffect } from 'react'
import styles from '../styles/List.module.css'
import ListItem from './ListItem'

interface ListType {
  name: string
  content: string[]
}

// interface ListProps {
//   lists: ListType[]
//   setLists:  Dispatch<SetStateAction<ListType[] | null>>
// }

const List = ({StorageList}: {StorageList: ListType}) => {


  const [list, setList] = useState<ListType | null>(null)
  const [content, setContent] = useState<string[]>([]);
  const [title, setTitle] = useState<string | null>(null)
  //input onChange selection
  const [item, setItem] = useState<string>("");
  //stores index for selected item to toggle 'selected' style, or delete?
  const [selectedItem, setSelectedItem] = useState<number | null>(null);


  //naming is all over the place here...


  useEffect(() => {
if(StorageList) {
  setList(StorageList)
}
  }, [])
  
  const DeleteItem = (selectedItem: number | null): void => {
    setContent(content.filter((item, index) => index !== selectedItem));
  };
  
  const AddItem = (content: string[], item: string) => {
    setContent([...content, item]);
    setItem("");
  };
  
  const RandomNumber = (): number => {
    return Math.floor(Math.random() * content.length);
  };
  
  return (
    <main className={styles.container}>
    <h2>{StorageList.name}</h2>

    <ul>

    {list?.content.map((item, index)=> 

    <ListItem key={index} item={item} index={index} selectedItem={selectedItem} />
    
    )}

    </ul>

    

<form className={styles.contentform} action="submit" onSubmit={(e) => e.preventDefault()}>
    <input value={item} type="text" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setItem(e.target.value)} />
    <button onClick={(e) => AddItem(content, item)}>Add</button>
    <button onClick={() => DeleteItem(selectedItem)}>Delete Selection</button>
    <button onClick={() => setSelectedItem(RandomNumber())}>Choose Random</button>
</form>

    </main>
  )
}

export default List