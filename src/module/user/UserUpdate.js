import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import Button from "../../components/button/Button";
import Radio from "../../components/checkbox/Radio";
import Field from "../../components/field/Field";
import FieldCheckboxes from "../../components/field/FieldCheckboxes";
import ImageUpload from "../../components/image/ImageUpload";
import Input from "../../components/input/Input";
import Label from "../../components/label/Label";
import { db } from "../../firebase/firebase-config";
import useFirebaseImage from "../../hooks/useFirebaseImage";
import { userRole, userStatus } from "../../utils/constants";
import DashboardHeading from "../dashboard/DashboardHeading";
import { toast } from "react-toastify";
import InputPasswordToggle from "../../components/input/InputPasswordToggle";
import Textarea from "../../components/textarea/Textarea";

function UserUpdate() {
    const {
        control,
        handleSubmit,
        setValue,
        getValues,
        watch,
        reset,
        formState: { isSubmitting, isValid },
    } = useForm({
        mode: "onChange",
    });

    const [params] = useSearchParams();
    const userId = params.get("id");

    const watchStatus = watch("status");
    const watchRole = watch("role");

    const { image, setImage, progress, handleSelectImage, handleDeleteImage } =
        useFirebaseImage(setValue, getValues);

    useEffect(() => {
        document.title = "Update user";
    }, []);

    useEffect(() => {
        async function fetchData() {
            if (!userId) return;
            const colRef = doc(db, "users", userId);
            const docData = await getDoc(colRef);
            reset(docData?.data());
            setImage(docData?.data().avatar);
        }
        fetchData();
    }, [userId, reset, setImage]);

    const handleUpdateUser = async (values) => {
        if (!isValid) return;
        console.log("values ", values);
        try {
            const colRef = doc(db, "users", userId);
            await updateDoc(colRef, {
                ...values,
                avatar: image,
                status: Number(values.status),
            });
            toast.success("Success!", { pauseOnHover: false });
        } catch (error) {
            console.log(error);
            toast.error("Error!!!");
        }
    };

    if (!userId) return null;

    return (
        <div>
            <DashboardHeading title="Update user"></DashboardHeading>
            <form onSubmit={handleSubmit(handleUpdateUser)}>
                <div className="w-[200px] h-[200px] mx-auto rounded-full mb-10">
                    <ImageUpload
                        className="!rounded-full h-full"
                        onChange={handleSelectImage}
                        handleDeleteImage={handleDeleteImage}
                        progress={progress}
                        image={image}
                    ></ImageUpload>
                </div>
                <div className="form-layout">
                    <Field>
                        <Label htmlFor="fullname">Fullname</Label>
                        <Input
                            name="fullname"
                            placeholder="Enter your fullname"
                            control={control}
                        ></Input>
                    </Field>
                    <Field>
                        <Label htmlFor="username">Username</Label>
                        <Input
                            name="username"
                            placeholder="Enter your username"
                            control={control}
                        ></Input>
                    </Field>
                </div>
                <div className="form-layout">
                    <Field>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            name="email"
                            type="email"
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
                </div>
                <div className="form-layout">
                    <Field>
                        <Label>Status</Label>
                        <FieldCheckboxes>
                            <Radio
                                name="status"
                                control={control}
                                checked={
                                    Number(watchStatus) === userStatus.ACTIVE
                                }
                                value={userStatus.ACTIVE}
                            >
                                Active
                            </Radio>
                            <Radio
                                name="status"
                                control={control}
                                checked={
                                    Number(watchStatus) === userStatus.PENDING
                                }
                                value={userStatus.PENDING}
                            >
                                Pending
                            </Radio>
                            <Radio
                                name="status"
                                control={control}
                                checked={Number(watchStatus) === userStatus.BAN}
                                value={userStatus.BAN}
                            >
                                Banned
                            </Radio>
                        </FieldCheckboxes>
                    </Field>
                    <Field>
                        <Label>Role</Label>
                        <FieldCheckboxes>
                            <Radio
                                name="role"
                                control={control}
                                checked={Number(watchRole) === userRole.ADMIN}
                                value={userRole.ADMIN}
                            >
                                Admin
                            </Radio>
                            <Radio
                                name="role"
                                control={control}
                                checked={Number(watchRole) === userRole.MOD}
                                value={userRole.MOD}
                            >
                                Moderator
                            </Radio>
                            <Radio
                                name="role"
                                control={control}
                                checked={Number(watchRole) === userRole.USER}
                                value={userRole.USER}
                            >
                                User
                            </Radio>
                        </FieldCheckboxes>
                    </Field>
                </div>
                <div>
                    <Field>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            name="description"
                            placeholder="Enter your description"
                            control={control}
                        ></Textarea>
                    </Field>
                </div>
                <Button
                    kind="primary"
                    className="mx-auto w-[200px]"
                    type="submit"
                    disabled={isSubmitting}
                >
                    Update
                </Button>
            </form>
        </div>
    );
}

export default UserUpdate;
