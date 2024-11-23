export default function AdminImgComp(props){
    return(
        <div className="imageAdmin" onClick={props.onClick} >
            <img src={props.idImage} alt="" />
            </div>
    )
}