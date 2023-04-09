import { useState, useEffect } from "react";
import "./App.css";
import List from "./components/List";

function App() {

  //lists stored in localstorage as json string
  const [lists, setLists] = useState<string | null>(null);

  //local 'lists' state value
  const [localLists, setLocalLists] = useState<List[] | null>(null)

  const Selectr = [
    {
      name: "listname",
      content: ["item", "item2", "item3"],
    },
    {
      name: "listname",
      content: ["item", "item2", "item3"],
    },
    {
      name: "listname",
      content: ["item", "item2", "item3"],
    }
  ];

  const listsStorage = localStorage.getItem("lists");

  useEffect(() => {
    setLists(listsStorage);
  }, [localLists]);

  return (
    <main className="App">

      <button onClick={() => localStorage.setItem("lists", JSON.stringify(Selectr))}>Add</button>

      <button onClick={() => localStorage.removeItem("lists")}>Remove</button>


      {lists ? lists : '' }

    </main>
  );
}

export default App;
