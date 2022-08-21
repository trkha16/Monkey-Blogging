import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "../components/button/Button";
import Field from "../components/field/Field";
import Input from "../components/input/Input";
import Label from "../components/label/Label";
import { useAuth } from "../contexts/auth-context";
import AuthenticationPage from "./AuthenticationPage";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase-config";
import InputPasswordToggle from "../components/input/InputPasswordToggle";

const schema = yup.object({
    email: yup
        .string()
        .required("Please enter your email address")
        .email("Please enter valid email address"),
    password: yup
        .string()
        .required("Please enter your password")
        .min(8, "Your password must be at least 8 characters or greater"),
});

function SignInPage() {
    const { userInfo } = useAuth();
    const navigate = useNavigate();
    const {
        handleSubmit,
        control,
        formState: { isSubmitting, isValid, errors },
    } = useForm({
        mode: "onChange",
        resolver: yupResolver(schema),
    });
    useEffect(() => {
        const arrErrors = Object.values(errors);
        if (arrErrors.length > 0) {
            toast.error(arrErrors[0]?.message, {
                pauseOnHover: false,
                delay: 0,
            });
        }
    }, [errors]);

    useEffect(() => {
        document.title = "Login";
        if (userInfo?.email) navigate("/");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSignIn = async (values) => {
        if (!isValid) return;
        await signInWithEmailAndPassword(auth, values.email, values.password);
        navigate("/");
    };

    return (
        <AuthenticationPage>
            <form className="form" onSubmit={handleSubmit(handleSignIn)}>
                <Field>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                        type="email"
                        name="email"
                        placeholder="Enter your email address"
                        control={control}
                    ></Input>
                </Field>
                <Field>
                    <Label htmlFor="password">Password</Label>
                    <InputPasswordToggle
                        control={control}
                    ></InputPasswordToggle>
                </Field>
                <div className="have-account">
                    Not a member? <NavLink to={"/sign-up"}>Sign up</NavLink>
                </div>
                <Button
                    type="submit"
                    style={{ maxWidth: 300, margin: "0 auto", width: "100%" }}
                    disabled={isSubmitting}
                >
                    Sign In
                </Button>
            </form>
        </AuthenticationPage>
    );
}

export default SignInPage;
