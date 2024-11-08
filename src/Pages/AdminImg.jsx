import React, {useEffect, useState } from 'react';
import { storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db } from '../firebase'; 
import { getFirestore,addDoc, collection, getDocs, query, where} from 'firebase/firestore';

import WorksImage from './WorksImage';

export default function AdminImg() {
    
    //Validação do login
    const pageValidation = () => {
        let password = document.querySelector('#login-password').value;

        if (password == 45287) {
            document.querySelector('.login').style.display = 'none';
            document.querySelector('#admin-page').style.display = 'flex';
        } else {
            document.querySelector('.informationPhrase').textContent = 'Senha incorreta insira novamente.';
        }
    };


    //REALIZA O UPLOAD NO BANCO
    const [images, setImages] = useState([]);

    const imageUpload = async (e) => {
        e.preventDefault(); // Previne o comportamento padrão do formulário
        const promises = [];
        const urls = []; // Array para armazenar URLs
    
        // Converte o FileList em um array
        const imagesArray = Array.from(images);
    
        for (let i = 0; i < imagesArray.length; i++) {
            const image = imagesArray[i];
            const imageRef = ref(storage, `images/${image.name}`); // Criar referência para cada imagem
            
            // Enviar imagem para o storage
            promises.push(uploadBytes(imageRef, image).then(async () => {
                const url = await getDownloadURL(imageRef); // Obter a URL após o upload
                urls.push(url); // Armazenar a URL
    
                // Verificar se a URL já existe no Firestore
                const q = query(collection(db, 'imageUrls'), where('url', '==', url));
                const querySnapshot = await getDocs(q);
                
                // Adicionar URL ao Firestore apenas se não existir
                if (querySnapshot.empty) {
                    await addDoc(collection(db, 'imageUrls'), { url }); // Armazena a URL na coleção 'imageUrls'
                }
            }));
        }
    
        try {
            await Promise.all(promises);
            setImages([]); // Limpa a lista de imagens
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
                const querySnapshot = await getDocs(collection(dbFire, "imageUrls")); // Substitua "nomeDaColecao" pelo nome da sua coleção
                const urls = querySnapshot.docs.map(doc => doc.data().url); // Substitua 'url' pelo nome do campo que armazena a URL
                setAllImagesUrls(urls);
            } catch (error) {
                console.error("Erro ao buscar imagens: ", error);
            }
        };

        fetchImages();
    }, [db]);

    return (
        <section id="admin-content">
            <div className="login">
                <p className="informationPhrase">Escreva a senha para ter acesso!</p>
                <input id="login-password" type="password" placeholder='Insira sua senha aqui!!' />
                <button onClick={pageValidation}>Enviar</button>
            </div>
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
                    </form>
                    <div className="photos-container" style={{marginTop: '40px'}}>
                        <div className="photos">
                            {allImagesUrls.map((url, index) => (
                                <WorksImage key={index} idImage={url} /> // Altere conforme a necessidade
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
