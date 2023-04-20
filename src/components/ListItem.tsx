import styles from '../styles/List.module.css'

 interface ListItemProps  {
  item: string
  index: number
  selectedItem: number | null
  setSelectedItem: React.Dispatch<React.SetStateAction<number | null>>
 }

const ListItem = ({ item, index, selectedItem, setSelectedItem }: ListItemProps) => {
  return (
    <>
    <li
    onClick={() => setSelectedItem(index)}
    className={index === selectedItem ? styles.active : styles.listitem}>
      {item}
    </li>
    </>
  )
}

export default ListItem