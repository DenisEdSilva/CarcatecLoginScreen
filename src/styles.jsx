import styled, { keyframes } from 'styled-components';

const opacityAnimation = keyframes`
	0% {  opacity: 0 }
`;

export const FormLogin = styled.form`
	width: 100%;
	opacity: 1;

	animation-name: ${opacityAnimation};
	animation-duration: 2s;
`;

export const FormRegistry = styled.form`
	width: 100%;
	opacity: 1;

	animation-name: ${opacityAnimation};
	animation-duration: 2s;
`;