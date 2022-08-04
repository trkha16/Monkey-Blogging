import styled from "styled-components";
import { useController } from "react-hook-form";

const InputStyles = styled.div`
    width: 100%;
    position: relative;
    input {
        width: 100%;
        padding: ${(props) => (props.hasIcon ? "20px 60px 20px 20px" : "20px")};
        background-color: ${(props) => props.theme.grayLight};
        border-radius: 8px;
        font-weight: 400;
        transition: all 0.2s linear;
        border: 1px solid transparent;
    }
    input:focus {
        background-color: white;
        border-color: ${(props) => props.theme.primary};
    }
    input::-webkit-input-placeholder {
        color: #84878b;
    }
    input::-moz-input-placeholder {
        color: #84878b;
    }
    .input-icon {
        position: absolute;
        cursor: pointer;
        top: 50%;
        right: 20px;
        transform: translateY(-50%);
    }
`;

function Input({
    name = "",
    type = "text",
    children,
    hasIcon,
    control,
    ...props
}) {
    const { field } = useController({
        control,
        name,
        defaultValue: "",
    });

    return (
        <InputStyles hasIcon={hasIcon}>
            <input id={name} type={type} {...field} {...props} />
            {hasIcon ? children : null}
        </InputStyles>
    );
}

export default Input;
