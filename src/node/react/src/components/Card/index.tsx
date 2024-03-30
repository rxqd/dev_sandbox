import "./styles.css";

type CardProps = {
    title: string;
    desc?: string;
}


const Card = ({title, desc}: CardProps) => {
  return (
      <div className="card card__dark">
        <h1>{title}</h1>
        <p>{desc}</p>
    </div>
  )
}

export default Card;
