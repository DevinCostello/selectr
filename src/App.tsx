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


  <section className="lists">
    {lists?.map((list, index) => <List key={list.id} list={list} lists={lists} setLists={setLists} deleteList={deleteList} />)}
  </section>
  
  <span onClick={() => createNewList()} className='addbtn'>
    <GrAdd size={26} />
  </span>

    </main>
  );
}

export default App;
