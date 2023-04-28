import { useState, useEffect } from "react";
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

    {lists && lists.length > 0 ? 
  <section className='lists'>
    {lists?.map((list) => <List key={list.id} list={list} lists={lists} setLists={setLists} deleteList={deleteList} />)}  
  </section>
    :
  <span className="nolists">
    <h1>Add a list by clicking here!</h1>
  </span>

  }
  
  <span onClick={() => createNewList()} className='addbtn'>
    <button>
      <GrAdd size={32} />
    </button>
  </span>

    </main>
  );
}

export default App;
