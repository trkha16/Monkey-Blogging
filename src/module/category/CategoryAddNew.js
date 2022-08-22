import { useForm } from "react-hook-form";
import Button from "../../components/button/Button";
import Radio from "../../components/checkbox/Radio";
import * as yup from "yup";
import slugify from "slugify";
import Field from "../../components/field/Field";
import Input from "../../components/input/Input";
import Label from "../../components/label/Label";
import DashboardHeading from "../dashboard/DashboardHeading";
import { categoryStatus } from "../../utils/constants";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../../firebase/firebase-config";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";

const schema = yup.object({
    name: yup.string().required("Please enter the category name"),
});

function CategoryAddNew() {
    const {
        control,
        handleSubmit,
        watch,
        reset,
        formState: { isValid, isSubmitting, errors },
    } = useForm({
        mode: "onChange",
        defaultValues: {
            name: "",
            slug: "",
            status: 1,
            createdAt: new Date(),
        },
        resolver: yupResolver(schema),
    });

    const handleAddNewCategory = async (values) => {
        if (!isValid) return;

        const newValues = { ...values };
        newValues.slug = slugify(values.slug || values.name, {
            lower: true,
        });
        newValues.status = Number(newValues.status);
        const colRef = collection(db, "categories");

        try {
            await addDoc(colRef, {
                ...newValues,
                createdAt: serverTimestamp(),
            });
            toast.success("Successfully");
        } catch (error) {
            toast.error(error.message);
        } finally {
            reset({
                name: "",
                slug: "",
                status: 1,
                createdAt: new Date(),
            });
        }
    };

    const watchStatus = watch("status");

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
        document.title = "Add new category";
    }, []);

    return (
        <div>
            <DashboardHeading
                title="New category"
                desc="Add new category"
            ></DashboardHeading>
            <form
                onSubmit={handleSubmit(handleAddNewCategory)}
                autoComplete="off"
            >
                <div className="form-layout">
                    <Field>
                        <Label htmlFor="name">Name</Label>
                        <Input
                            control={control}
                            name="name"
                            placeholder="Enter your category name"
                        ></Input>
                    </Field>
                    <Field>
                        <Label htmlFor="slug">Slug</Label>
                        <Input
                            control={control}
                            name="slug"
                            placeholder="Enter your slug"
                        ></Input>
                    </Field>
                </div>
                <div className="form-layout">
                    <Field>
                        <Label>Status</Label>
                        <div className="flex flex-wrap gap-x-5">
                            <Radio
                                name="status"
                                control={control}
                                checked={
                                    Number(watchStatus) ===
                                    categoryStatus.APPROVED
                                }
                                value={categoryStatus.APPROVED}
                            >
                                Approved
                            </Radio>
                            <Radio
                                name="status"
                                control={control}
                                checked={
                                    Number(watchStatus) ===
                                    categoryStatus.UNAPPROVED
                                }
                                value={categoryStatus.UNAPPROVED}
                            >
                                Unapproved
                            </Radio>
                        </div>
                    </Field>
                </div>
                <Button
                    kind="primary"
                    className="mx-auto"
                    type="submit"
                    disabled={isSubmitting}
                >
                    Add new category
                </Button>
            </form>
        </div>
    );
}

export default CategoryAddNew;
