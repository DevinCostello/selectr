import { useState, useEffect } from "react";
import "./App.css";
import List from "./components/List";



function App() {

const [data, setData] = useState<any>([])

  return (
    <main className="App">
      <List title={"Movies To Watch"}/>
      <List title={"Anime To Watch"}/>
      <List title={"Tv Shows To Watch"}/>


    </main>
  );
}

export default App;
