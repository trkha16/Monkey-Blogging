import styled from "styled-components";

const LabelStatusStyles = styled.div`
    display: inline-block;
    padding: 10px 15px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
`;

function LabelStatus({ children, type = "default" }) {
    let styleClassname = "text-gray-500 bg-gray-100";
    switch (type) {
        case "success":
            styleClassname = "text-green-500 bg-green-100";
            break;
        case "warning":
            styleClassname = "text-orange-500 bg-orange-100";
            break;
        case "danger":
            styleClassname = "text-red-500 bg-red-100";
            break;

        default:
            break;
    }

    return (
        <LabelStatusStyles className={styleClassname}>
            {children}
        </LabelStatusStyles>
    );
}

export default LabelStatus;
