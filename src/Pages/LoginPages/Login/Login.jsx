import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from "../../../firebase";

export default function Login() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    function handleLogin(e) {
        e.preventDefault();
        signInWithEmailAndPassword(email, password)
    }

    if (error) {
        return (
            <div>
                <p>Error: {error.message}</p>
            </div>
        );
    }
    if (loading) {
        return <p>Loading...</p>;
    }

    if (user) {
      navigate('/AdminDb')
    }

    return (
        <div className="loginRegister">
            <h1>Faça o seu login</h1>
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
                <Link to='/Register'>Clique aqui para se registrar.</Link>
                <button className="submitBtn" onClick={handleLogin}>Enviar</button>
            </div>
        </div>
    )
}