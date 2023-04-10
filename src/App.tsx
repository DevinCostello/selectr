import { useState, useEffect } from "react";
import "./App.css";
import List from "./components/List";

interface ListType {
  name: string
  content: string[]
}

function App() {

  //lists stored in localstorage as json string
  const [lists, setLists] = useState<ListType[] | null>(null);

  
  const testData = [
    {
      name: "Movies",
      content: ["Goodfellas", "The Big Lebowski", "Platoon"],
    },
    {
      name: "Anime",
      content: ["My Hero Academia", "Berserk (1997)", "Akagi"],
    },
    {
      name: "listname",
      content: ["item", "item2", "item3"],
    }
  ];

  useEffect(() => {
    const StorageValue = localStorage.getItem('lists')
    if(StorageValue) {
      setLists(JSON.parse(StorageValue))
    }
  }, []);

  useEffect(() => {
    //set updated lists array to localstorage
    // localStorage.setItem('lists', lists)
  },[lists])

  return (
    <main className="App">

      <button onClick={() => localStorage.setItem("lists", JSON.stringify(testData))}>Add</button>

      <button onClick={() => localStorage.removeItem("lists")}>Remove</button>

    {lists?.map((StorageList, index) => <List key={index} StorageList={StorageList} />)}

    </main>
  );
}

export default App;
