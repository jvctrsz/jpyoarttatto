import React, { useState } from 'react';
import { storage } from '../firebase'; // Assegure-se de que está importando o storage corretamente
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db } from '../firebase'; // Importe seu Firestore
import { addDoc, collection, getDocs, query, where} from 'firebase/firestore'; // Importe os métodos necessários do Firestore

export default function AdminImg() {
    const pageValidation = () => {
        let password = document.querySelector('#login-password').value;

        if (password == 45287) {
            document.querySelector('.login').style.display = 'none';
            document.querySelector('#admin-page').style.display = 'flex';
        } else {
            document.querySelector('.informationPhrase').textContent = 'Senha incorreta insira novamente.';
        }
    };

    const [images, setImages] = useState([]);
    const [progress, setProgress] = useState(0);
    const [imageURLs, setImageURLs] = useState([]); // Estado para armazenar URLs das imagens

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
            setImageURLs(urls); // Atualizar estado com as URLs
            setProgress(100);
            setImages([]); // Limpa a lista de imagens
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <section id="admin-content">
            <div className="login">
                <p className="informationPhrase">Escreva a senha para ter acesso!</p>
                <input id="login-password" type="password" style={{ color: 'black' }} />
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
                        {progress > 0 && <p>Upload progress: {progress}%</p>}
                    </form>
                    {imageURLs.length > 0 && (
                        <div>
                            <h3>Imagens carregadas:</h3>
                            <ul>
                                {imageURLs.map((url, index) => (
                                    <li key={index}>
                                        <img src={url} alt="" style={{ width: 300 }} />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
