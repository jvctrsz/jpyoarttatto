import React from "react";

export default function ContactsPhoto(props) {
  return (
    <div className="photo-tutorial">
      <div className="image-tutorial">
        <div className="img-tuto">
          <img src={`../images/imagem-tutorial-${props.Num}.png`} alt="" />
        </div>
      </div>
    </div>
  );
}
