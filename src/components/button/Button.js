import { NavLink } from "react-router-dom";
import styled, { css } from "styled-components";

const ButtonStyles = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    padding: 25px;
    line-height: 1;
    ${(props) =>
        props.kind === "primary" &&
        css`
            color: white;
            background-image: linear-gradient(
                to right bottom,
                ${(props) => props.theme.primary},
                ${(props) => props.theme.secondary}
            );
        `};
    ${(props) =>
        props.kind === "secondary" &&
        css`
            color: ${(props) => props.theme.primary};
            background-color: white;
        `};
    border-radius: 8px;
    font-size: 18px;
    font-weight: 500;
    height: ${(props) => props.height};
    &:disabled {
        opacity: 0.5;
        pointer-events: none;
    }
`;

function Button({
    type = "button",
    onClick = () => {},
    children,
    kind = "primary",
    to = "",
    ...props
}) {
    if (to !== "" && typeof to === "string") {
        return (
            <NavLink to={to} style={{ display: "inline-block" }}>
                <ButtonStyles type={type} kind={kind} {...props}>
                    {children}
                </ButtonStyles>
            </NavLink>
        );
    }
    return (
        <ButtonStyles type={type} kind={kind} onClick={onClick} {...props}>
            {children}
        </ButtonStyles>
    );
}

export default Button;
