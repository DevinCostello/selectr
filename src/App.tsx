import { useState, useEffect, useRef } from "react";
import "./App.css";
import { v4 as uuidv4 } from 'uuid'
import { BsPlusSquare } from 'react-icons/bs'
import List from "./components/List";

interface ListType {
  name: string
  id: string
  content: string[]
}

function App() {

const [lists, setLists] = useState<ListType[] | null>(null);

const [openNewList, setOpenNewList] = useState<boolean>(false)
const newListRef = useRef<HTMLInputElement>(null);


  const testData = [
    {
      name: "Movies",
      id: uuidv4(),
      content: ["Goodfellas", "The Big Lebowski", "Platoon"]
    },
    {
      name: "Anime",
      id: uuidv4(),
      content: ["My Hero Academia", "Berserk (1997)", "Akagi"]
    },
    {
      name: "listname",
      id: uuidv4(),
      content: ["item", "item2", "item3"]
    }
  ];

  useEffect(() => {
    const StorageValue = localStorage.getItem('lists')
    if(StorageValue) {
      setLists(JSON.parse(StorageValue))
    }
  }, []);

  const createNewList = () => {

    const newListRefValue = newListRef.current?.value ?? "";

    // lists can be created with title as empty string because of useref typescript bs

    if (newListRef.current) {
      newListRef.current.value = "";
    }

    if(lists) {
      setLists([...lists, {
        name: newListRefValue,
        id: uuidv4(),
        content: []
      }])
    } else {
      setLists([{
        name: newListRefValue,
        id: uuidv4(),
        content: []
      }])
    }

  }

  const deleteList = (id: string): void => {
     const deletedLists = lists?.filter((list) => list.id !== id)
    setLists(deletedLists)
  }

  return (
    <main className="App">

      <button onClick={() => localStorage.setItem("lists", JSON.stringify(testData))}>Add</button>
      <button onClick={() => localStorage.removeItem("lists")}>Remove</button>

    {lists?.map((list, index) => <List key={index} list={list} lists={lists} setLists={setLists} deleteList={deleteList} />)}

    <BsPlusSquare onClick={() => setOpenNewList(!openNewList)} size={24} />

    <section className={openNewList ? "newlistopen": "newlist"}>
      <form action="submit" onSubmit={(e) => e.preventDefault()}>
        <input type="text" ref={newListRef} />
        <button onClick={() => createNewList()}>Create New List</button>
      </form>
    </section>

    </main>
  );
}

export default App;
