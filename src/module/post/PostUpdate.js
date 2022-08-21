import {
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    updateDoc,
    where,
} from "firebase/firestore";
import { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import Button from "../../components/button/Button";
import Radio from "../../components/checkbox/Radio";
import Dropdown from "../../components/dropdown/Dropdown";
import List from "../../components/dropdown/List";
import Option from "../../components/dropdown/Option";
import Select from "../../components/dropdown/Select";
import Field from "../../components/field/Field";
import Input from "../../components/input/Input";
import Label from "../../components/label/Label";
import Toggle from "../../components/toggle/Toggle";
import { db } from "../../firebase/firebase-config";
import { postStatus } from "../../utils/constants";
import DashboardHeading from "../dashboard/DashboardHeading";
import ReactQuill from "react-quill";
import { toast } from "react-toastify";
import "react-quill/dist/quill.snow.css";

const PostUpdate = () => {
    const [params] = useSearchParams();
    const postId = params.get("id");

    const [content, setContent] = useState("");

    const { control, handleSubmit, setValue, watch, reset } = useForm({
        mode: "onChange",
    });

    const watchHot = watch("hot");
    const watchStatus = watch("status");

    useEffect(() => {
        async function fetchData() {
            if (!postId) return;
            const docRef = doc(db, "posts", postId);
            const docSnapshot = await getDoc(docRef);
            if (docSnapshot.data()) {
                reset(docSnapshot.data());
                setSelectCategory(docSnapshot.data()?.category || "");
                setContent(docSnapshot.data()?.content || "");
            }
        }
        fetchData();
    }, [postId, reset]);

    const [categories, setCategories] = useState([]);
    useEffect(() => {
        async function getCategoriesData() {
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
        getCategoriesData();
    }, []);

    const [selectCategory, setSelectCategory] = useState();
    const handleClickOption = async (item) => {
        const colRef = doc(db, "categories", item.id);
        const docData = await getDoc(colRef);
        setValue("category", {
            id: docData.id,
            ...docData.data(),
        });
        setSelectCategory(item);
    };

    const updatePostHandler = async (values) => {
        const docRef = doc(db, "posts", postId);
        await updateDoc(docRef, {
            content,
        });
        toast.success("Success");
    };

    if (!postId) return null;

    return (
        <Fragment>
            <DashboardHeading title="Update post"></DashboardHeading>
            <form onSubmit={handleSubmit(updatePostHandler)}>
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
                        {/*  <ImageUpload
                            onChange={handleSelectImage}
                            handleDeleteImage={handleDeleteImage}
                            className="h-[250px]"
                            progress={progress}
                            image={image}
                        ></ImageUpload> */}
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
                <Button type="submit" className="mx-auto">
                    Update post
                </Button>
            </form>
        </Fragment>
    );
};

export default PostUpdate;
