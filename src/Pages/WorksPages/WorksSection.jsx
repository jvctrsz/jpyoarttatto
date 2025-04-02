import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import WorksImage from "./WorksImage";
import BtnInicio from "../BtnInicio";

export default function WorksSection() {
  //BUSCA TODAS AS IMAGENS
  const [imageUrls, setImageUrls] = useState([]);
  const db = getFirestore();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        //BUSCA OS DOCUMENTOS DO FIRESTORE
        const querySnapshot = await getDocs(collection(db, "imageUrls"));
        //BUSCA AS URLS
        const urls = querySnapshot.docs.map((doc) => doc.data().url);
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
        <h2 className="cssanimation typing">Trabalhos</h2>
      </div>
      <div className="photos-container cssanimation fadeIn">
        <div className="photos">
          {imageUrls.map((url, index) => (
            <WorksImage key={index} idImage={url} />
          ))}
        </div>
      </div>
      <BtnInicio />
    </div>
  );
}
