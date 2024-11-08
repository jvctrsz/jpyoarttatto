export default function WorksImage(props){
    return(
        <div className="image" onClick={props.onClick} >
            <img src={props.idImage} alt="" />
            </div>
    )
}