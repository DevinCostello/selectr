import { useState, useEffect, useRef } from "react";
import styles from "../styles/List.module.css";
import { BiEdit } from "react-icons/bi";
import ListItem from "./ListItem";
import { useListReducer } from "../Reducer";

interface ListProps {
  list: ListType;
  lists: ListType[];
  setLists: React.Dispatch<React.SetStateAction<ListType[] | null>>;
  deleteList(id: string): void
}
interface ListType {
  name: string;
  id: string;
  content: string[];
}

const List = ({ list, lists, setLists, deleteList }: ListProps) => {

  const [editingTitle, setEditingTitle] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false)
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  const titleRef = useRef<HTMLInputElement>(null);
  const [titleInputValue, setTitleInputValue] = useState<string>('')
  const itemRef = useRef<HTMLInputElement>(null);
  const [itemInputValue, setItemInputValue] = useState<string>('')

  const { state: reducerState, addItem, deleteItem, changeTitle } = useListReducer(list)


  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(lists));
  }, [lists]);


  useEffect(() => {

    const updatedLists = lists.map((obj) => {
      if (obj.id === reducerState.id) {
        return reducerState
      } else {
        return obj
      }
    })

    if (mounted) {
      setLists(updatedLists)
    } else {
      setMounted(true)
    }


  }, [reducerState])

  useEffect(() => {
    titleRef.current?.focus()
  }, [editingTitle])

  
  const RandomNumber = (list: ListType): number => {
    return Math.floor(Math.random() * list.content.length);
  };


  return (
    <main className={styles.container}>
      <form className={styles.title} action="submit"
        onSubmit={(e) => {
          e.preventDefault()
          changeTitle(titleRef.current?.value ?? '')
          setTitleInputValue('')
          setEditingTitle(false)
        }
        }
      >
        <h2 className={editingTitle ? styles.titleInactive : styles.titleActive}>
          {list?.name}
        </h2>

        <input
          className={editingTitle ? styles.titleActive : styles.titleInactive}
          type="text"
          ref={titleRef}
          onChange={(e) => setTitleInputValue(e.target.value)}
          value={titleInputValue}
        />
        <BiEdit onClick={() => {
          setEditingTitle(!editingTitle)
          titleRef.current?.focus()
        }
        } size={28} />
      </form>

      <button onClick={() => deleteList(list.id)}>X</button>

      <ul>
        {list.content.map((item, index) => (
          <ListItem
            key={index}
            item={item}
            index={index}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
          />
        ))}
      </ul>

      <form
        className={styles.contentform}
        action="submit"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          onChange={(e) => setItemInputValue(e.target.value)}
          type="text" value={itemInputValue} ref={itemRef} />
        <button onClick={() => {
          addItem(itemRef.current?.value ?? '')
          setItemInputValue('')
        }
        }>Add Item</button>
        <button onClick={() => {
          deleteItem(selectedItem)
          setSelectedItem(null)
        }
        }>Delete Item</button>
        <button onClick={() => setSelectedItem(RandomNumber(list))}>
          Roll
        </button>
      </form>
    </main>
  );
};

export default List;
export type { ListType }
