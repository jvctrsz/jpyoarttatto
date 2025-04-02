export default function WorksImage(props) {
  return (
    <div className="image">
      <a href={props.idImage} target="_blank" rel="imagem do portfolio">
        <img src={props.idImage} alt="" />
      </a>
    </div>
  );
}
