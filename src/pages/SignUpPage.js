import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "../components/button/Button";
import Field from "../components/field/Field";
import Input from "../components/input/Input";
import Label from "../components/label/Label";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase/firebase-config";
import { NavLink, useNavigate } from "react-router-dom";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import AuthenticationPage from "./AuthenticationPage";
import InputPasswordToggle from "../components/input/InputPasswordToggle";
import slugify from "slugify";
import { userRole, userStatus } from "../utils/constants";

const schema = yup.object({
    fullname: yup.string().required("Please enter your fullname"),
    email: yup
        .string()
        .required("Please enter your email address")
        .email("Please enter valid email address"),
    password: yup
        .string()
        .required("Please enter your password")
        .min(8, "Your password must be at least 8 characters or greater"),
});

function SignUpPage() {
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
        await createUserWithEmailAndPassword(
            auth,
            values.email,
            values.password
        );
        await updateProfile(auth.currentUser, {
            displayName: values.fullname,
            photoURL: "",
        });

        await setDoc(doc(db, "users", auth.currentUser.uid), {
            fullname: values.fullname,
            email: values.email,
            password: values.password,
            username: slugify(values.fullname, { lower: true }),
            avatar: "",
            status: userStatus.ACTIVE,
            role: userRole.USER,
            createdAt: serverTimestamp(),
        });

        toast.success("Success!!!");
        navigate("/");
    };

    useEffect(() => {
        document.title = "Register";
    }, []);

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
        <AuthenticationPage>
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
                    <InputPasswordToggle
                        control={control}
                    ></InputPasswordToggle>
                </Field>
                <div className="have-account">
                    You already have an account?{" "}
                    <NavLink to={"/sign-in"}>Login</NavLink>
                </div>
                <Button
                    type="submit"
                    style={{ maxWidth: 300, margin: "0 auto", width: "100%" }}
                    disabled={isSubmitting}
                >
                    Sign Up
                </Button>
            </form>
        </AuthenticationPage>
    );
}

export default SignUpPage;
