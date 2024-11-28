import React, { useEffect, useState } from 'react';
import { storage } from '../../firebase';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db } from '../../firebase';
import { getFirestore, addDoc, collection, getDocs, query, where, doc, deleteDoc } from 'firebase/firestore';

import AdminImgComp from './AdminImgComp';

export default function AdminDb() {

    //REALIZA O UPLOAD NO BANCO
    const [images, setImages] = useState([]);
    const [progress, setProgress] = useState(0);

    const imageUpload = async (e) => {
        e.preventDefault();
        const promises = [];
        const urls = [];

        const imagesArray = Array.from(images);

        for (let i = 0; i < imagesArray.length; i++) {
            const image = imagesArray[i];
            const imageRef = ref(storage, `images/${image.name}`);

            // UPLOAD DAS IMAGENS PARA O FIREBASE
            promises.push(uploadBytes(imageRef, image).then(async () => {
                //BAIXA A URL
                const url = await getDownloadURL(imageRef);
                //ENVIA A URL
                urls.push(url);

                // VERIFICA SE JA EXISTE UMA URL COM O MESMO NOME
                const q = query(collection(db, 'imageUrls'), where('url', '==', url));
                const querySnapshot = await getDocs(q);

                // ENVIA A URL, SE NÃO EXISTIR NENHUMA COM O MESMO NOME
                if (querySnapshot.empty) {
                    await addDoc(collection(db, 'imageUrls'), { url });
                }
            }));
        }

        try {
            await Promise.all(promises);
            setImages([]);
            setProgress(100);

        } catch (error) {
            console.error(error);
        }
    };

    //BUSCA TODAS AS IMAGENS NO BANCO
    const [allImagesUrls, setAllImagesUrls] = useState([]);
    const dbFire = getFirestore();

    useEffect(() => {
        const fetchImages = async () => {
            try {
                //BUSCA OS DOCUMENTOS DO FIRESTORE
                const querySnapshot = await getDocs(collection(dbFire, "imageUrls"));
                //BUSCA AS URLS E ID
                const urls = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    url: doc.data().url
                }));
                setAllImagesUrls(urls);
            } catch (error) {
                console.error("Erro ao buscar imagens: ", error);
            }
        };

        fetchImages();
    }, [db]);


    //DELETAR IMAGENS
    const deleteImage = async (imageId, imageUrl) => {
        try {
            // DELETA O DOC DO FIRESTORE ATRAVES DO ID
            await deleteDoc(doc(dbFire, 'imageUrls', imageId));

            // DELETA O ARQUIVO DO FIREBASE ATRAVES DA URL
            const storageRef = ref(storage, imageUrl);
            await deleteObject(storageRef);

            console.log(`Imagem ${imageId} deletada com sucesso.`);
        } catch (error) {
            console.error("Erro ao deletar a imagem: ", error);
        }
    };

    //CAPTURA O CLICK E DELETA AS IMAGENS
    const clickImageDelete = async (imageId, imageUrl) => {
        await deleteImage(imageId, imageUrl);
        setAllImagesUrls(prevImages => prevImages.filter(image => image.id !== imageId));
    };

    //ATUALIZA A PAGINA APOS UPLOAD
    if (progress == 100) {
        window.location.reload()
    }
    
    return (
        <section id="admin-content">
            <div id="admin-page">
                <div className="admin-container">
                    <form>
                        <p>Envie sua imagem</p>
                        <input
                            type="file"
                            multiple
                            onChange={(e) => setImages(e.target.files)}
                        />
                        <button onClick={imageUpload}>Enviar</button>
                        <p>Após upload a página irá carregar sozinha.</p>
                    </form>
                    <div className="photos-container" style={{ marginTop: '40px' }}>
                        <div className="photos">
                            {allImagesUrls.map(image => (
                                <AdminImgComp
                                    key={image.id}
                                    idImage={image.url}
                                    onClick={() => clickImageDelete(image.id, image.url)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
