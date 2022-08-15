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

const PostAddNewStyles = styled.div``;

function PostAddNew() {
    const { control, watch, setValue, handleSubmit, getValues } = useForm({
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

    const { image, progress, handleSelectImage, handleDeleteImage } =
        useFirebaseImage(setValue, getValues);

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
                            onChange={handleSelectImage}
                            handleDeleteImage={handleDeleteImage}
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
