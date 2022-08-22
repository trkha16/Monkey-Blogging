import { useController } from "react-hook-form";
import styled from "styled-components";

const TextareaStyles = styled.div`
    width: 100%;
    position: relative;
    textarea {
        width: 100%;
        padding: 16px 20px;
        background-color: transparent;
        border-radius: 8px;
        border: 1px solid gray;
        font-weight: 400;
        transition: all 0.2s linear;
        resize: none;
        min-height: 200px;
        font-size: 14px;
    }
    textarea::-webkit-input-placeholder {
        color: #84878b;
    }
    textarea::-moz-input-placeholder {
        color: #84878b;
    }
`;

function Textarea({ name = "", type = "text", children, control, ...props }) {
    const { field } = useController({
        control,
        name,
        defaultValue: "",
    });

    return (
        <TextareaStyles>
            <textarea id={name} type={type} {...field} {...props} />
        </TextareaStyles>
    );
}

export default Textarea;
