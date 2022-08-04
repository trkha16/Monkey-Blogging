import { useForm } from "react-hook-form";
import styled from "styled-components";
import Field from "../components/field/Field";
import IconEyeClose from "../components/icon/IconEyeClose";
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
                    <Field>
                        <Label htmlFor="fullname">Fullname</Label>
                        <Input
                            type="text"
                            name="fullname"
                            placeholder="Enter your fullname"
                            control={control}
                        ></Input>
                    </Field>
                    <Field>
                        <Label htmlFor="email">Email address</Label>
                        <Input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            control={control}
                        ></Input>
                    </Field>
                    <Field>
                        <Label htmlFor="password">Password</Label>
                        <Input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            control={control}
                            hasIcon
                        >
                            <IconEyeClose className="input-icon"></IconEyeClose>
                        </Input>
                    </Field>
                </form>
            </div>
        </SignUpPageStyles>
    );
}

export default SignUpPage;
