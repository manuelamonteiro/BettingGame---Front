import styled from "styled-components";

export const FormContainer = styled.div`
    width:100%;
    margin-top: 24px;
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
    }

    input{
        padding-left:17px;
        margin-bottom:13px;
        width: 80%;
        max-width:429px;
        height: 65px;
        border-radius: 6px;
        ::placeholder{
        font-family: 'Raleway', sans-serif;
        font-style: normal;
        font-weight: 700;
        font-size: 27px;
        line-height: 40px;
        @media(max-width: 600px) {
            font-size: 20px;
        }
        }
    }

    button{
        margin-bottom:22px;
        width: 80%;
        max-width:429px;
        height: 65px;
        border-radius: 6px;
        font-family: 'Raleway', sans-serif;
        font-style: normal;
        font-weight: 700;
        font-size: 27px;
        line-height: 40px;
        background-color: #DCDCDC;
        cursor: pointer;
    }

    p{
        font-family: 'Raleway', sans-serif; ;
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 24px;
        text-decoration-line: underline;
    }
`;