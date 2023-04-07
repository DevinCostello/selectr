import styles from '../styles/List.module.css'

 interface ListItemProps  {
  item: string
  index: number
  selectedItem: number | null
 }

const ListItem = ({ item, index, selectedItem }: ListItemProps) => {
  return (
    <>
    <li className={index === selectedItem ? styles.active : styles.listitem}>
      {item}
    </li>
    </>
  )
}

export default ListItem