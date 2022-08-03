import { useForm } from "react-hook-form";
import styled from "styled-components";
import Input from "../components/input/Input";
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

    .form {
        max-width: 600px;
        margin: 0 auto;
    }
`;

function SignUpPage() {
    const {
        control,
        handleSubmit,
        formState: { errors, isValid, isSubmitting },
    } = useForm();

    const handleSignUp = (e) => {
        e.preventDefault();
    };

    return (
        <SignUpPageStyles>
            <div className="container">
                <img
                    srcSet="/logo.png 2x"
                    alt="monkey-blogging"
                    className="logo"
                />
                <h1 className="heading">monkey blogging</h1>
                <form className="form" onSubmit={handleSubmit(handleSignUp)}>
                    <div className="field">
                        <Label htmlFor="fullname">Fullname</Label>
                        <Input
                            type="text"
                            name="fullname"
                            placeholder="Enter your fullname"
                            control={control}
                        ></Input>
                    </div>
                </form>
            </div>
        </SignUpPageStyles>
    );
}

export default SignUpPage;
