import styled from "styled-components";

const Flex = styled.div`
    display: flex;
    align-items: center;
`;

export const LogoContainer = styled(Flex)`
	display: flex;
	align-items: center;
	justify-content: center;

	h1{
		font-family: 'Saira Stencil One', cursive;
		font-style: normal;
		font-weight: 400;
		line-height: 50px;
		font-size: 48px;

		@media(max-width: 600px) {
		font-size: 44px;
		}
	}
`;