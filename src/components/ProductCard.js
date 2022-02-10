import { Card } from "react-bootstrap"
export const ProductCard = ({
  onClick,
  title,
  category,
  id,
  description,
  price,
  imgUrl
}) => {
  const productPrice = Math.floor(price * 10)
  return (
    <Card
      onClick={onClick}
      id={id}
      style={{ width: "18rem", cursor: "pointer" }}
    >
      <Card.Img src={imgUrl} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{category}</Card.Text>
        <Card.Text>{description}</Card.Text>
        <Card.Text>{productPrice} TL</Card.Text>
      </Card.Body>
    </Card>
  )
}
