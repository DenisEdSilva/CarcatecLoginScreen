import React, { useReducer } from 'react';

import { Link } from 'react-router-dom';

export default function Home() {
  return (
	  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', height: '100vh'}}>
		  <h1 style={{ fontWeight: 'bold', }}>Essa é a tela do Home</h1>
		  <span style={{ fontSize: 18 }}>Seja bem vindo!</span>

		  <Link style={{ 
				border: 'none', 
				textDecoration: 'none', 
				backgroundColor: '#1B8EF2', 
				paddingTop: 8, 
				paddingBottom: 8, 
				paddingRight: 24, 
				paddingLeft: 24, 
				borderRadius: 4, 
				marginTop: 8, 
				color: '#000' 
			}} to="/">Sair</Link>
	  </div>
  );
}