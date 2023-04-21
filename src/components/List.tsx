import { useState, useEffect, useRef, FormEvent } from "react";
import { useListReducer } from "../Reducer";
import ListItem from "./ListItem";

import styles from "../styles/List.module.css";
import { BiEdit } from "react-icons/bi";
import { GrCheckmark } from 'react-icons/gr'
import { IoIosAddCircle } from 'react-icons/io'
import { AiFillDelete } from 'react-icons/ai'
import { BsFillDice5Fill } from 'react-icons/bs'


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

  useEffect(() => {
    setTitleInputValue(list.name)
  },[])


  const RandomNumber = (list: ListType): number => {
    return Math.floor(Math.random() * list.content.length);
  };

  const handleTitleChange = (e: MouseEvent | FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    changeTitle(titleRef.current?.value ?? '')
    setEditingTitle(false)
  }


  return (
    <main className={styles.container}>
      <button className={styles.deletebtn} onClick={() => deleteList(list.id)}>
        X
      </button>

      <form className={styles.title} action="submit"
        onSubmit={(e) => handleTitleChange(e)}>

        <h3 className={editingTitle ? styles.titleInactive : styles.titleActive}>
          {list?.name}
        </h3>

        <input
          className={editingTitle ? styles.titleActive : styles.titleInactive}
          type="text"
          ref={titleRef}
          onChange={(e) => setTitleInputValue(e.target.value)}
          value={titleInputValue}
        />

        <BiEdit className={editingTitle ? styles.titleInactive : styles.titleActive} onClick={() => {
          setEditingTitle(!editingTitle)
          titleRef.current?.focus()
        }
        } size={28} />

        <GrCheckmark onClick={(e) => handleTitleChange(e)} className={editingTitle ? styles.titleActive && styles.checkicon : styles.titleInactive} size={26} />

      </form>


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
          placeholder="Enter list item"
          type="text" value={itemInputValue} ref={itemRef} />


        <button onClick={() => {
          addItem(itemRef.current?.value ?? '')
          setItemInputValue('')
        }
        }><IoIosAddCircle size={25} /></button>

      </form>
      <section className={styles.icons}>
        <button onClick={() => {
          deleteItem(selectedItem)
          setSelectedItem(null)
        }
        }><AiFillDelete size={25} />
        </button>

        <button onClick={() => setSelectedItem(RandomNumber(list))}>
          <BsFillDice5Fill size={25} />
        </button>
      </section>
    </main>
  );
};

export default List;
export type { ListType }
