import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from "../../../firebase";

export default function Register() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);

    function handleSignIn(e){
        e.preventDefault();
        createUserWithEmailAndPassword(email, password)
    }

    if (error) {
        return (
            <div>
                <p>Error: {error.message}</p>
            </div>
        );
    }
    if (user) {
        navigate('/Login')
    }
    return (
        <div className="loginRegister">
            <h1>Faça o seu registro</h1>
            <div className="inputsContainer">
                <form>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input className="inputCss"
                            name="email"
                            type="email"
                            placeholder="Insira seu email aqui" 
                            onChange={e => setEmail(e.target.value)}
                            />
                    </div>
                    <div>
                        <label htmlFor="senha">Senha</label>
                        <input className="inputCss"
                            name="senha"
                            type="password"
                            placeholder='Insira sua senha aqui'
                            onChange={e => setPassword(e.target.value)}
                            />
                    </div>
                </form>
                <Link to='/Login'>Clique aqui para se logar.</Link>
                <button className="submitBtn" onClick={handleSignIn}>Enviar</button>
            </div>
        </div>
    )
}