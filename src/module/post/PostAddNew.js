import { useForm } from "react-hook-form";
import slugify from "slugify";
import styled from "styled-components";
import Button from "../../components/button/Button";
import Radio from "../../components/checkbox/Radio";
import Field from "../../components/field/Field";
import Input from "../../components/input/Input";
import Label from "../../components/label/Label";
import { postStatus } from "../../utils/constants";
import ImageUpload from "../../components/image/ImageUpload";
import useFirebaseImage from "../../hooks/useFirebaseImage";
import ReactQuill, { Quill } from "react-quill";
import axios from "axios";
import * as yup from "yup";
import Toggle from "../../components/toggle/Toggle";
import { useEffect, useMemo, useState } from "react";
import {
    addDoc,
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    serverTimestamp,
    where,
} from "firebase/firestore";
import { db } from "../../firebase/firebase-config";
import Dropdown from "../../components/dropdown/Dropdown";
import Select from "../../components/dropdown/Select";
import ImageUploader from "quill-image-uploader";
import "react-quill/dist/quill.snow.css";
import List from "../../components/dropdown/List";
import Option from "../../components/dropdown/Option";
import { useAuth } from "../../contexts/auth-context";
import { toast } from "react-toastify";
import DashboardHeading from "../dashboard/DashboardHeading";
import { yupResolver } from "@hookform/resolvers/yup";

Quill.register("modules/imageUploader", ImageUploader);

const PostAddNewStyles = styled.div``;

const schema = yup.object({
    title: yup.string().required("Please enter the title"),
});

function PostAddNew() {
    const { userInfo } = useAuth();

    const {
        control,
        watch,
        setValue,
        handleSubmit,
        getValues,
        reset,
        formState: { errors, isValid, isSubmitting },
    } = useForm({
        mode: "onChange",
        defaultValues: {
            title: "",
            slug: "",
            status: postStatus.PENDING,
            hot: false,
            image: "",
            category: {},
            user: {},
        },
        resolver: yupResolver(schema),
    });

    const watchStatus = watch("status");
    const watchHot = watch("hot");

    const {
        image,
        handleResetUpload,
        progress,
        handleSelectImage,
        handleDeleteImage,
    } = useFirebaseImage(setValue, getValues);
    const [categories, setCategories] = useState([]);
    const [selectCategory, setSelectCategory] = useState();

    useEffect(() => {
        async function fetchUserData() {
            if (!userInfo.email) return;
            const q = query(
                collection(db, "users"),
                where("email", "==", userInfo.email)
            );
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setValue("user", {
                    id: doc.id,
                    ...doc.data(),
                });
            });
        }
        fetchUserData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const addPostHandler = async (values) => {
        if (!isValid) return;
        try {
            const cloneValues = { ...values };
            cloneValues.slug = slugify(values.slug || values.title, {
                lower: true,
            });
            const colRef = collection(db, "posts");
            await addDoc(colRef, {
                ...cloneValues,
                image,
                content,
                createdAt: serverTimestamp(),
            });

            toast.success("Success!", { pauseOnHover: false });
            reset({
                title: "",
                slug: "",
                status: postStatus.PENDING,
                hot: false,
                image: "",
                category: {},
                user: {},
            });
            setSelectCategory(null);
            handleResetUpload();
            setContent("");
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        async function getData() {
            const colRef = collection(db, "categories");
            const q = query(colRef, where("status", "==", 1));
            const querySnapshot = await getDocs(q);
            let results = [];
            querySnapshot.forEach((doc) => {
                results.push({
                    id: doc.id,
                    ...doc.data(),
                });
            });
            setCategories(results);
        }
        getData();
    }, []);

    useEffect(() => {
        document.title = "Add new post";
    }, []);

    const handleClickOption = async (item) => {
        const colRef = doc(db, "categories", item.id);
        const docData = await getDoc(colRef);
        setValue("category", {
            id: docData.id,
            ...docData.data(),
        });
        setSelectCategory(item);
    };

    const [content, setContent] = useState("");
    const modules = useMemo(
        () => ({
            toolbar: [
                ["bold", "italic", "underline", "strike"],
                ["blockquote"],
                [{ header: 1 }, { header: 2 }], // custom button values
                [{ list: "ordered" }, { list: "bullet" }],
                [{ header: [1, 2, 3, 4, 5, 6, false] }],
                ["link", "image"],
            ],
            imageUploader: {
                upload: async (file) => {
                    const bodyFormData = new FormData();
                    bodyFormData.append("image", file);
                    const response = await axios({
                        method: "post",
                        url: "https://api.imgbb.com/1/upload?key=4ead2467144f52e461408662982ac5a8",
                        data: bodyFormData,
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    });
                    return response.data.data.url;
                },
            },
        }),
        []
    );

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
        <PostAddNewStyles>
            <DashboardHeading
                title="Add post"
                desc="Add new post"
            ></DashboardHeading>
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
                            onChange={handleSelectImage}
                            handleDeleteImage={handleDeleteImage}
                            className="h-[250px]"
                            progress={progress}
                            image={image}
                        ></ImageUpload>
                    </Field>
                    <Field>
                        <Label>Category</Label>
                        <Dropdown>
                            <Select placeholder="Select the category"></Select>
                            <List>
                                {categories.length > 0 &&
                                    categories.map((item) => (
                                        <Option
                                            key={item.id}
                                            onClick={() =>
                                                handleClickOption(item)
                                            }
                                        >
                                            {item.name}
                                        </Option>
                                    ))}
                            </List>
                        </Dropdown>
                        {selectCategory?.name && (
                            <span className="inline-block p-3 rounded-lg bg-green-50 text-green-600 font-medium">
                                {selectCategory?.name}
                            </span>
                        )}
                    </Field>
                </div>
                <div className="mb-10">
                    <Field>
                        <Label>Content</Label>
                        <ReactQuill
                            className="w-full entry-content"
                            theme="snow"
                            modules={modules}
                            value={content}
                            onChange={setContent}
                        />
                    </Field>
                </div>
                <div className="grid grid-cols-2 gap-x-10 mb-10">
                    <Field>
                        <Label>Feature post</Label>
                        <Toggle
                            on={watchHot === true}
                            onClick={() => {
                                setValue("hot", !watchHot);
                            }}
                        ></Toggle>
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
                </div>
                <Button
                    type="submit"
                    className="mx-auto"
                    disabled={isSubmitting}
                >
                    Add new post
                </Button>
            </form>
        </PostAddNewStyles>
    );
}

export default PostAddNew;
