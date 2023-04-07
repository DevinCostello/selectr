import { useState } from "react";
import "./App.css";
import List from "./components/List";

function App() {

  const [item, setItem] = useState<string>("");
  const [list, setList] = useState<string[]>(["one", "two", "three"]);
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  
  const DeleteItem = (selectedItem: number | null): void => {
    setList(list.filter((item, index) => index !== selectedItem));
  };
  
  const AddItem = (list: string[], item: string) => {
    setList([...list, item]);
    setItem("");
  };
  
  //how will RandomNumber derive list.length if state value is moved to List component?
  //Should RandomNumber be moved to List component?
  const RandomNumber = (): number => {
    return Math.floor(Math.random() * list.length);
  };

  return (
    <main className="App">
      {/* <form action="submit" onSubmit={(e) => e.preventDefault()}>
        <input
          value={item}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setItem(e.target.value)
          }
          type="text"
        />
        <button onClick={(e) => AddItem(list, item ? item : "")}>Add</button>
      </form>
      <button onClick={() => DeleteItem(selectedItem)}>Remove</button>
      <button>Roll Random Item</button> */}

      <List
        title={"Movies To Watch"}
        list={list}
        AddItem={AddItem}
        DeleteItem={DeleteItem}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        RandomNumber={RandomNumber}

      />

      {/* <List title={"Anime To Watch"} items={["Ippo", "Cowboy Bebop", "Akira"]} setSelectedItem={setSelectedItem} /> */}
    </main>
  );
}

export default App;
