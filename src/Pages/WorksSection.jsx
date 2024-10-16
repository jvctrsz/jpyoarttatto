import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore"; // Certifique-se de que esses imports estão corretos
import WorksImage from "./WorksImage";
import BtnInicio from "./BtnInicio";

export default function WorksSection() {
    const [imageUrls, setImageUrls] = useState([]);
    const db = getFirestore();

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "imageUrls")); // Substitua "nomeDaColecao" pelo nome da sua coleção
                const urls = querySnapshot.docs.map(doc => doc.data().url); // Substitua 'url' pelo nome do campo que armazena a URL
                console.log(urls)
                setImageUrls(urls);
            } catch (error) {
                console.error("Erro ao buscar imagens: ", error);
            }
        };

        fetchImages();
    }, [db]);

    return (
        <div className="works-box">
            <div className="works-title">
                <h2 className="cssanimation typing">Trabalhos!!</h2>
            </div>
            <div className="photos-container cssanimation fadeIn">
                <div className="photos">
                    {imageUrls.map((url, index) => (
                        <WorksImage key={index} idImage={url} /> // Altere conforme a necessidade
                    ))}     
                </div>
            </div>
            <BtnInicio/>
        </div>
    );
}
