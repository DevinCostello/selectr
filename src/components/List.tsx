import { useState, useEffect, useRef } from "react";
import styles from "../styles/List.module.css";
import { BiEdit } from "react-icons/bi";
import ListItem from "./ListItem";

interface ListType {
  name: string;
  content: string[];
}

const List = ({ StorageList }: { StorageList: ListType }) => {
  const [list, setList] = useState<ListType | null>(null);

  const [editingTitle, setEditingTitle] = useState<boolean>(false);
  const titleRef = useRef<HTMLInputElement>(null);

  const itemRef = useRef<HTMLInputElement>(null);

  //stores index for selected item to toggle 'selected' style, or delete?
  const [selectedItem, setSelectedItem] = useState<number | null>(0);

  //naming is all over the place here...

  useEffect(() => {
    if (StorageList) {
      setList(StorageList);
    }
  }, []);

  const AddItem = (list: ListType) => {
    const itemRefValue = itemRef.current?.value ?? "";
    setList({
      ...list,
      content: [...list?.content, itemRefValue],
    });

    if(itemRef.current)
    {itemRef.current.value = ''}

  };

  const DeleteItem = (list: ListType, selectedItem: number): void => {
    setList({
      ...list,
      content: list.content.filter((item, index) => index !== selectedItem),
    });
    setSelectedItem(null);
  };

  const RandomNumber = (list: ListType): number => {
    return Math.floor(Math.random() * list.content.length);
  };

  const UpdateTitle = (list: ListType): void => {
    const titleRefValue = titleRef.current?.value ?? "";
    setList({ ...list, name: titleRefValue });
    setEditingTitle(false);
  };

  return (
    <main className={styles.container}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          UpdateTitle(list);
        }}
        className={styles.title}
      >
        <h2
          className={editingTitle ? styles.titleInactive : styles.titleActive}
        >
          {list?.name}
        </h2>
        <input
          className={editingTitle ? styles.titleActive : styles.titleInactive}
          type="text"
          ref={titleRef}
        />
        <BiEdit onClick={() => setEditingTitle(!editingTitle)} size={28} />
      </form>

      <ul>
        {list?.content.map((item, index) => (
          <ListItem
            key={index}
            item={item}
            index={index}
            selectedItem={selectedItem}
          />
        ))}
      </ul>

      <form
        className={styles.contentform}
        action="submit"
        onSubmit={(e) => e.preventDefault()}
      >
        <input type="text" ref={itemRef} />
        <button onClick={(e) => AddItem(list)}>Add</button>
        <button onClick={() => DeleteItem(list, selectedItem)}>
          Delete Selection
        </button>
        <button onClick={() => setSelectedItem(RandomNumber(list))}>
          Choose Random
        </button>
      </form>
    </main>
  );
};

export default List;
