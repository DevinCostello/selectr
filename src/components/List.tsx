import { useState, useEffect, useRef, FormEvent } from "react";
import { useListReducer } from "../Reducer";
import ListItem from "./ListItem";

// css/icons
import styles from "../styles/List.module.css";
import { BiEdit } from "react-icons/bi";
import { GrCheckmark } from 'react-icons/gr'
import { MdDelete } from 'react-icons/md'
import { BsFillDice5Fill, BsPlusSquareFill } from 'react-icons/bs'


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
  const [modal, setModal] = useState<boolean>(false)
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  const titleRef = useRef<HTMLInputElement>(null);
  const [titleInputValue, setTitleInputValue] = useState<string>('')
  const itemRef = useRef<HTMLInputElement>(null);
  const [itemInputValue, setItemInputValue] = useState<string>('')

  const modalRef = useRef<HTMLDivElement>(null)

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
  }, [])


  const RandomNumber = (list: ListType): number => {
    return Math.floor(Math.random() * list.content.length);
  };

  const handleTitleChange = (e: React.MouseEvent<HTMLButtonElement> | FormEvent<HTMLInputElement>) => {

    if (editingTitle) {
      e.preventDefault()
      changeTitle(titleRef.current?.value ?? '')
      setEditingTitle(false)
    }
  }

  const openModal = () => {

    if (list.name === "Add Title" && list.content.length === 0) { deleteList(list.id) } else {
      setModal(true)
    }

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (modalRef.current) {
      modalRef.current.style.top = scrollTop + 'px';
    }
  }

  return (
    <main className={styles.container}>

      <button className={styles.deletebtn} onClick={() => openModal()}>
        X
      </button>


      {/* modal */}
      <section ref={modalRef} className={modal ? styles.active_modal : styles.modal}>
        <span className={styles.modal_content}>
          <h2>Are you sure you want to delete this list?</h2>
          <button onClick={() => deleteList(list.id)}>Yes</button>
          <button onClick={() => setModal(false)}>No</button>
        </span>
      </section>

      <form className={styles.title} action="submit"
        onSubmit={(e) => e.preventDefault()}>

        <h3 className={editingTitle ? styles.titleInactive : styles.titleActive}>
          {list?.name}
        </h3>

        <input
          className={editingTitle ? styles.titleActive : styles.titleInactive}
          type="text"
          ref={titleRef}
          onSubmit={(e) => handleTitleChange(e)}
          onChange={(e) => setTitleInputValue(e.target.value)}
          value={titleInputValue}
        />


        <button onClick={(e) => handleTitleChange(e)} className={editingTitle ? styles.titleActive && styles.checkicon : styles.titleInactive}>
          <GrCheckmark size={26} />
        </button>


        <button className={editingTitle ? styles.titleInactive : styles.titleActive}
          onClick={() => {
            setEditingTitle(!editingTitle)
            titleRef.current?.focus()
          }
          }>
          <BiEdit size={28} />
        </button>

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
        className={styles.contentform} action="submit" onSubmit={(e) => e.preventDefault()}>

        <input
          onChange={(e) => setItemInputValue(e.target.value)}
          type="text"
          value={itemInputValue}
          ref={itemRef}
        />

        <button onClick={() => {
          addItem(itemRef.current?.value ?? '1')
          setItemInputValue('')
        }}>
          <BsPlusSquareFill size={35} />
        </button>

      </form>
      <section className={styles.icons}>

        <button className={styles.deleteitembtn} onClick={() => {
          deleteItem(selectedItem)
          setSelectedItem(null)
        }} >
          <MdDelete size={35} />
        </button>

        <button>
          <BsFillDice5Fill onClick={() => setSelectedItem(RandomNumber(list))} size={39} />
        </button>
      </section>
    </main>
  );
};

export default List;
export type { ListType }
