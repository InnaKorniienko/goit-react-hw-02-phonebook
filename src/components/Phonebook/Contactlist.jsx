export default function Contactlist({items, removeContact}) {
  const elements = items.map(({ name, number, id }) => {
    return <li key={id}>Name: {name}. Tel: {number} <span onClick={() => removeContact(id)}>Delete</span></li>
  })
  return (
    <ul>{elements}</ul>
  )
}
