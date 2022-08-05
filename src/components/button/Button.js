import styled from "styled-components";

const ButtonStyles = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    padding: 25px;
    line-height: 1;
    color: white;
    background-image: linear-gradient(
        to right bottom,
        ${(props) => props.theme.primary},
        ${(props) => props.theme.secondary}
    );
    border-radius: 8px;
    font-size: 18px;
    font-weight: 500;
    width: 100%;
    &:disabled {
        opacity: 0.5;
        pointer-events: none;
    }
`;

function Button({ type = "button", onClick = () => {}, children, ...props }) {
    return (
        <ButtonStyles type={type} onClick={onClick} {...props}>
            {children}
        </ButtonStyles>
    );
}

export default Button;
