import React from "react"
import {Link} from 'react-router-dom'

function Menu(){
    return (
        <div className="menu">
            <div className="menuList cssanimation fadeInBottom">
                <Link to='/AboutSection' className="list">Sobre Mim</Link>
                <Link to='/WorksSection' className="list">Trabalhos</Link>
                <Link to='/ContactsSection' className="list">Contatos</Link>
            </div>
        </div>
    )
}

export default Menu

// onclick={aboutMenu()}
// onclick={worksMenu()}
// onclick={contactMenu()}