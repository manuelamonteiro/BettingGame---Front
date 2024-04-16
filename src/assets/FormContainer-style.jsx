import styled from "styled-components";

export const FormContainer = styled.div`
	width:100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	form{
		width:100%;
		display:flex;
		flex-direction:column;
		align-items:center;
		justify-content: center;
		margin: 1rem;
	}

	input{
		padding-left:1rem;
		margin-bottom:13px;
		width: 80%;
		height: 45px;
		border-radius: 6px;

		::placeholder{
			font-family: 'Raleway', sans-serif;
			font-style: normal;
			font-weight: 500;
			font-size: 1rem;
		}
	}

	button{
		width: 80%;
		height: 45px;
		border-radius: 6px;
		font-family: 'Raleway', sans-serif;
		font-style: normal;
		font-weight: 600;
		font-size: 1rem;
		line-height: 40px;
		background-color: #DCDCDC;
		cursor: pointer;
	}

	p{
		font-family: 'Raleway', sans-serif;
		font-style: normal;
		font-weight: 400;
		font-size: 20px;
		line-height: 24px;
		text-decoration-line: underline;
	}
`;