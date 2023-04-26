import { useState, useEffect, useRef } from "react";
import "./App.css";
import { v4 as uuidv4 } from 'uuid'
import { GrAdd } from 'react-icons/gr'
import List from "./components/List";

interface ListType {
  name: string
  id: string
  content: string[]
}

function App() {

const [lists, setLists] = useState<ListType[] | null>(null);
const [modal, setModal] = useState<boolean>(false)
const [listlayout, setListLayout] = useState<boolean>(false)
const [listlength, setListLength] = useState<number | null>(null)



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
    const ListInStorage = localStorage.getItem('lists')
    if(ListInStorage) {
      //set stored lists to app level 'lists' state
      setLists(JSON.parse(ListInStorage))
    } 
  }, []);

  useEffect(() => {

    if(lists) {
      setListLength(lists.length);
    }

  },[lists])



  const createNewList = (): void => {

    if(lists) {
      setLists([...lists, {
        name: "Add Title",
        id: uuidv4(),
        content: []
      }])
    } else {
      setLists([{
        name: "Add Title",
        id: uuidv4(),
        content: []
      }])
    }

  }

  const deleteList = (id: string): void => {
     const deletedLists = lists?.filter((list) => list.id !== id)
    setLists(deletedLists)

    if(lists?.length === 1
      ) {
        localStorage.removeItem('lists')
      }
  }

  

  return (
    <main className="App">

      {/* <button onClick={() => localStorage.setItem("lists", JSON.stringify(testData))}>Add</button>
      <button onClick={() => localStorage.removeItem("lists")}>Remove</button> */}

      {/* <h2>Selectr.</h2> */}

  <section className={listlength ? `lists${listlength}` : "lists"}>
    {lists ? 
    lists?.map((list) => <List key={list.id} list={list} lists={lists} setLists={setLists} deleteList={deleteList} />)
    :
    <h2>Add a list by clicking here!</h2>
  }
  </section>
  
  <span onClick={() => createNewList()} className='addbtn'>
    <button>
    <GrAdd size={26} />
    </button>
  </span>

    </main>
  );
}

export default App;
