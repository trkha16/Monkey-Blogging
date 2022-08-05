import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Button from "../components/button/Button";
import Field from "../components/field/Field";
import IconEyeClose from "../components/icon/IconEyeClose";
import IconEyeOpen from "../components/icon/IconEyeOpen";
import Input from "../components/input/Input";
import Label from "../components/label/Label";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase/firebase-config";
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";

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

const schema = yup.object({
    fullname: yup.string().required("Please enter your fullname"),
    email: yup
        .string()
        .email("Please enter valid email address")
        .required("Please enter your email address"),
    password: yup
        .string()
        .min(8, "Your password must be at least 8 characters or greater")
        .required("Please enter your password"),
});

function SignUpPage() {
    const [togglePassword, setTogglePassword] = useState(false);

    const navigate = useNavigate();

    const {
        control,
        handleSubmit,
        formState: { errors, isValid, isSubmitting },
    } = useForm({
        mode: "onChange",
        resolver: yupResolver(schema),
    });

    const handleSignUp = async (values) => {
        if (!isValid) return;
        const user = await createUserWithEmailAndPassword(
            auth,
            values.email,
            values.password
        );
        await updateProfile(auth.currentUser, {
            displayName: values.fullname,
        });

        const colRef = collection(db, "users");
        await addDoc(colRef, {
            fullname: values.fullname,
            email: values.email,
            password: values.password,
        });

        toast.success("Success!!!");
        navigate("/");
    };

    useEffect(() => {
        const arrErrors = Object.values(errors);
        if (arrErrors.length > 0) {
            toast.error(arrErrors[0]?.message, {
                pauseOnHover: false,
                delay: 0,
            });
        }
    }, [errors]);

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
                            type={togglePassword ? "text" : "password"}
                            name="password"
                            placeholder="Enter your password"
                            control={control}
                            hasIcon
                        >
                            {!togglePassword ? (
                                <IconEyeClose
                                    className="input-icon"
                                    onClick={() => setTogglePassword(true)}
                                ></IconEyeClose>
                            ) : (
                                <IconEyeOpen
                                    className="input-icon"
                                    onClick={() => setTogglePassword(false)}
                                ></IconEyeOpen>
                            )}
                        </Input>
                    </Field>
                    <Button
                        type="submit"
                        style={{ maxWidth: 300, margin: "0 auto" }}
                        disabled={isSubmitting}
                    >
                        Sign Up
                    </Button>
                </form>
            </div>
        </SignUpPageStyles>
    );
}

export default SignUpPage;
