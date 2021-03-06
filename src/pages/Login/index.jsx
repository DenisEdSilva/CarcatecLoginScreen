import React, { useState } from 'react';
import './loginStyles.css';
import { useNavigate } from 'react-router-dom';

import styled, { keyframes } from 'styled-components';

export default function Login() {
	const navigation = useNavigate();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [registry, setRegistry] = useState(true);
	const [nome, setNome] = useState('');
	const [cpf, setCpf] = useState('');
	
	async function handleSignIn(e) {
		e.preventDefault();
		try {
			const response = await fetch("http://localhost:3456/user")
			const data = await response.json()
			validateSignIn(data)
		} catch (error) {
			console.error(error)
		}

	} 

	function handleRegistry(event) {

		event.preventDefault();
		setRegistry(!registry);
		setEmail('');
		setPassword('');
		setNome('');
		setCpf('');
	}

	function showRegistry(event) {
		alert(`Nome: ${nome} \nEmail: ${email} \nSenha: ${password} \nCPF: ${cpf}`)
		event.preventDefault();
	}

	function validateSignIn(users) {
		for (let user of users) {
			if (user.email === email && user.password === password) {
				navigation('/Home', user.nome)
				return
			} 
		} 
		throw alert("Error 401: usuario não registrado.")
	}

	const cpfMask = value => {
		return value
			.replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
			.replace(/(\d{3})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
			.replace(/(\d{3})(\d)/, '$1.$2')
			.replace(/(\d{3})(\d{1,2})/, '$1-$2')
			.replace(/(-\d{2})\d+?$/, '$1') // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
	}


	function maskedCpf(event){
		const { value } = event.target

		setCpf(cpfMask(value))
	}

	return (
		<div className='container'>
			<div className='loginContainer'>
				<WrapLogin registrar={registry}>
					{registry ? (
						// renderização da area de login
						<FormLogin>
							<span className="loginTitle">Welcome!</span>
				
							<div className="wrapInput">
								<input
									className={email !== '' ? 'hasValue input' : 'input'}
									type="email"
									value={email}
									onChange={(text) => setEmail(text.target.value)}
								/>
								<span className="focusInput" dataPlaceholder="Email" ></span>
							</div>
							<div className="wrapInput">
								<input
									className={password !== '' ? 'hasValue input' : 'input'}
									type="password"
									value={password}
									onChange={(text) => setPassword(text.target.value)}
								/>
								<span className="focusInput" dataPlaceholder="Password" ></span>
							</div>

							<div className="containerLoginFormBtn">
								<button className="loginFormBtn" onClick={handleSignIn}>Login</button>
							</div>

							<div className="textSpace">
								<span className="textRegistry">Don't have an account?</span>
								<button className="registry" onClick={handleRegistry} >Click here.</button>
							</div>
						</FormLogin>
					) : (
						// renderização da area de registros
						<FormRegistry>
							<span className="loginTitle">Welcome!</span>
							<div className="wrapInput">
								<input
									className={nome !== '' ? 'hasValue input' : 'input'}
									type="text"
									value={nome}
									onChange={(text) => setNome(text.target.value)}
								/>
								<span className="focusInput" dataPlaceholder="Nome" ></span>
							</div>
							<div className="wrapInput">
								<input
									className={cpf !== '' ? 'hasValue input' : 'input'}
									type="text"
									value={cpf}
									onChange={maskedCpf}
								/>
								<span className="focusInput" dataPlaceholder="CPF" ></span>
							</div>
							<div className="wrapInput">
								<input
									className={email !== '' ? 'hasValue input' : 'input'}
									type="email"
									value={email}
									onChange={(text) => setEmail(text.target.value)}
								/>
								<span className="focusInput" dataPlaceholder="Email" ></span>
							</div>
							<div className="wrapInput">
								<input
									className={password !== '' ? 'hasValue input' : 'input'}
									type="password"
									value={password}
									onChange={(text) => setPassword(text.target.value)}
								/>
								<span className="focusInput" dataPlaceholder="Password" ></span>
							</div>

							<div className="containerLoginFormBtn">
								<button className="loginFormBtn" onClick={showRegistry}>Registry</button>
							</div>

							<div className="textSpace">
								<span className="textRegistry">Have an account?</span>
								<button className="registry" onClick={handleRegistry} >Click here.</button>
							</div>
						</FormRegistry>
					)}
				</WrapLogin >
			</div>
		</div>	
	)
}

const slideUpAnimation = keyframes`
	0% { height: 460px; }
`;

const slideDownAnimation = keyframes`
	0% { height: 621px; }
`;

const WrapLogin = styled.div`
	width: 390px;
	background-color: #fff9f7;
	border-radius: 10px;
	height: ${props => (props.registrar ? '460px' : '621px')};
	overflow: hidden;
	padding: 77px 55px 33px 55px;
	box-shadow: 0 4px 6px 0px rgba(0, 0, 0, 0.6);
	
	animation-name: ${props => (props.registrar ? slideDownAnimation : slideUpAnimation )};
	animation-duration: 1s;
`;

const opacityAnimation = keyframes`
	0% {  opacity: 0 }
`;

export const FormLogin = styled.form`
	width: 100%;
	opacity: 1;

	animation-name: ${opacityAnimation};
	animation-duration: 2.3s;
`;

export const FormRegistry = styled.form`
	width: 100%;
	opacity: 1;

	animation-name: ${opacityAnimation};
	animation-duration: 2s;
`;
