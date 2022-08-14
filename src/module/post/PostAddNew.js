import { useState } from "react";
import { useForm } from "react-hook-form";
import slugify from "slugify";
import styled from "styled-components";
import Button from "../../components/button/Button";
import Radio from "../../components/checkbox/Radio";
import Field from "../../components/field/Field";
import Input from "../../components/input/Input";
import Label from "../../components/label/Label";
import { postStatus } from "../../utils/constants";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase-config";
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";
import ImageUpload from "../../components/image/ImageUpload";

const PostAddNewStyles = styled.div``;

function PostAddNew() {
    const { control, watch, setValue, handleSubmit } = useForm({
        mode: "onChange",
        defaultValues: {
            title: "",
            slug: "",
            status: postStatus.PENDING,
            category: "",
        },
    });

    const watchStatus = watch("status");

    const addPostHandler = async (values) => {
        const cloneValues = { ...values };
        cloneValues.slug = slugify(values.slug || values.title);
    };

    const [progress, setProgress] = useState(0);
    const [image, setImage] = useState("");

    const handleUploadImage = (file) => {
        const storage = getStorage();

        const storageRef = ref(storage, "images/" + file.name);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progressPercent =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(progressPercent);
                switch (snapshot.state) {
                    case "paused":
                        console.log("Upload is paused");
                        break;
                    case "running":
                        console.log("Upload is running");
                        break;
                    default:
                        console.log("Nothing");
                }
            },
            (error) => {
                // Handle unsuccessful uploads
                console.log("Error");
            },
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log("File available at", downloadURL);
                    setImage(downloadURL);
                });
            }
        );
    };

    const onSelectImage = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setValue("image", file);
        handleUploadImage(file);
    };

    return (
        <PostAddNewStyles>
            <h1 className="dashboard-heading">Add new post</h1>
            <form onSubmit={handleSubmit(addPostHandler)}>
                <div className="grid grid-cols-2 gap-x-10 mb-10">
                    <Field>
                        <Label htmlFor="title">Title</Label>
                        <Input
                            control={control}
                            placeholder="Enter your title"
                            name="title"
                        />
                    </Field>
                    <Field>
                        <Label htmlFor="slug">Slug</Label>
                        <Input
                            control={control}
                            placeholder="Enter your slug"
                            name="slug"
                        />
                    </Field>
                </div>
                <div className="grid grid-cols-2 gap-x-10 mb-10">
                    <Field>
                        <Label>Image</Label>
                        <ImageUpload
                            onChange={onSelectImage}
                            className="h-[250px]"
                            progress={progress}
                            image={image}
                        ></ImageUpload>
                    </Field>
                    <Field>
                        <Label>Status</Label>
                        <div className="flex items-center gap-x-5">
                            <Radio
                                name="status"
                                control={control}
                                checked={
                                    Number(watchStatus) === postStatus.APPROVED
                                }
                                value={postStatus.APPROVED}
                            >
                                Approved
                            </Radio>
                            <Radio
                                name="status"
                                control={control}
                                checked={
                                    Number(watchStatus) === postStatus.PENDING
                                }
                                value={postStatus.PENDING}
                            >
                                Pending
                            </Radio>
                            <Radio
                                name="status"
                                control={control}
                                checked={
                                    Number(watchStatus) === postStatus.REJECTED
                                }
                                value={postStatus.REJECTED}
                            >
                                Reject
                            </Radio>
                        </div>
                    </Field>
                    <Field>
                        <Label htmlFor="author">Author</Label>
                        <Input
                            control={control}
                            placeholder="Find the author"
                            name="author"
                        ></Input>
                    </Field>
                </div>
                <div className="grid grid-cols-2 gap-x-10 mb-10">
                    <Field>
                        <Label>Category</Label>
                    </Field>
                    <Field></Field>
                </div>
                <Button type="submit" className="mx-auto">
                    Add new post
                </Button>
            </form>
        </PostAddNewStyles>
    );
}

export default PostAddNew;
