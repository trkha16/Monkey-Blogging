import { NavLink } from "react-router-dom";
import styled from "styled-components";

const NotFoundPageStyles = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .logo {
        display: inline-block;
        margin-bottom: 40px;
    }
    .heading {
        margin-bottom: 40px;
    }
    .back {
        display: inline-block;
        color: white;
        padding: 15px 30px;
        background-color: ${(props) => props.theme.primary};
        border-radius: 4px;
        font-weight: 500;
    }
`;

function NotFoundPage() {
    return (
        <NotFoundPageStyles>
            <NavLink to="/" className={"logo"}>
                <img srcSet="/logo.png 2x" alt="monkey-blogging" />
            </NavLink>
            <h1 className="heading">Oops! Page not found</h1>
            <NavLink to="/" className={"back"}>
                Back to home
            </NavLink>
        </NotFoundPageStyles>
    );
}

export default NotFoundPage;
