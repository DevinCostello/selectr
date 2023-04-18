import { useState, useEffect, useRef, useReducer } from "react";
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
  const itemRef = useRef<HTMLInputElement>(null);

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


  const RandomNumber = (list: ListType): number => {
    return Math.floor(Math.random() * list.content.length);
  };


  return (
    <main className={styles.container}>
      <form className={styles.title} action="submit"
        onSubmit={(e) => {
          e.preventDefault()
          changeTitle(titleRef.current?.value ?? '')
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
        />
        <button onClick={() => deleteList(list.id)}>X</button>
        <BiEdit onClick={() => setEditingTitle(!editingTitle)} size={28} />
      </form>

      <ul>
        {list.content.map((item, index) => (
          <ListItem
            key={index}
            item={item}
            index={index}
            selectedItem={selectedItem}
          />
        ))}
      </ul>

      <form
        className={styles.contentform}
        action="submit"
        onSubmit={(e) => e.preventDefault()}
      >
        <input type="text" ref={itemRef} />
        <button onClick={() => addItem(itemRef.current?.value ?? '')}>Add Item</button>
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
