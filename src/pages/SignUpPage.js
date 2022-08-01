import styled from "styled-components";
import Label from "../components/label/Label";

const SignUpPageStyles = styled.div`
    min-height: 100vh;
    padding: 40px;
    .logo {
        margin: 0 auto 20px;
    }
    .heading {
        text-align: center;
        color: ${(props) => props.theme.primary};
        font-weight: bold;
        font-size: 40px;
        margin-bottom: 60px;
        text-transform: capitalize;
    }
    .field {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        row-gap: 20px;
    }

    .input {
        width: 100%;
        padding: 20px;
        background-color: ${(props) => props.theme.grayLight};
        border-radius: 8px;
        font-weight: 400;
        transition: all 0.2s linear;
        border: 1px solid transparent;
    }
    .input:focus {
        background-color: white;
        border-color: ${(props) => props.theme.primary};
    }
    .input::-webkit-input-placeholder {
        color: #84878b;
    }
    .input::-moz-input-placeholder {
        color: #84878b;
    }
    .form {
        max-width: 600px;
        margin: 0 auto;
    }
`;

function SignUpPage() {
    return (
        <SignUpPageStyles>
            <div className="container">
                <img
                    srcSet="/logo.png 2x"
                    alt="monkey-blogging"
                    className="logo"
                />
                <h1 className="heading">monkey blogging</h1>
                <form className="form">
                    <div className="field">
                        <Label htmlFor="fullname">Fullname</Label>
                        <input
                            id="fullname"
                            type="text"
                            className="input"
                            placeholder="Enter your fullname"
                        />
                    </div>
                </form>
            </div>
        </SignUpPageStyles>
    );
}

export default SignUpPage;
