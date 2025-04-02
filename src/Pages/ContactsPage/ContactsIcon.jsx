import React from "react";
export default function ContactsIcon(props) {
  return (
    <div className={`${props.Classe} contacts cssanimation fadeInLeft`}>
      <a href={props.LinkApp} className="links">
        <div className="icons">
          <div className="icon-image">
            <img
              src={`../images/${props.NameApp}-icon.png`}
              alt={`Icone do ${props.NameApp}`}
            />
          </div>
          <div className="info">{props.Info}</div>
        </div>
      </a>
    </div>
  );
}
