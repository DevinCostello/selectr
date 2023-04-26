import styles from '../styles/List.module.css'

 interface ListItemProps  {
  item: string
  index: number
  selectedItem: number | null
  setSelectedItem: React.Dispatch<React.SetStateAction<number | null>>
 }

const ListItem = ({ item, index, selectedItem, setSelectedItem }: ListItemProps) => {

const handleClick = (index: number) => {

if(selectedItem === index) {
  setSelectedItem(null)
} else {
  setSelectedItem(index)
}

}

  return (
    <>
    <li
    onClick={() => handleClick(index)}
    className={index === selectedItem ? styles.listitem_active : styles.listitem}>
      {item}
    </li>
    </>
  )
}

export default ListItem