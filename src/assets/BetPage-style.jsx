import styled from "styled-components";

export const BetPageContainer = styled.div`
	display: flex;
	flex-direction:column;
	align-items: center;

	h1{
		font-family: 'Saira Stencil One', cursive;
		font-style: normal;
		font-weight: 400;
		line-height: 50px;
		font-size: 48px;
		margin: 2rem;

		@media(max-width: 600px) {
		font-size: 44px;
		}
	}

	.buttons{
		width:100%;
		display:flex;
		justify-content: space-evenly;
		margin: 2rem;

		button{
			font-family: 'Raleway', sans-serif;
			font-style: normal;
			font-weight: 600;
			font-size: 1rem;
			border-radius: 6px;
			line-height: 40px;
			background-color: #DCDCDC;
			cursor: pointer;
		}
	}
`;

export const CardContainer = styled.div`
	display: flex;
	align-items: center;
	padding: 2rem;
	gap: 1.25rem;
	border-bottom: 1px solid #ccc;

	font-family: 'Raleway', sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: 1rem;
        line-height: 40px;

	.card{
		display:flex;
		flex-direction: column;
	}

	@media(max-width: 600px) {
		flex-direction: column;
		gap: 0.875rem;

		.submit-bet{
			padding-top: 1rem;
		}
	}

	.card h2, .bet-result h2{
		font-weight: 600;
	}
`;