import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useNavigate, useSearchParams } from "react-router-dom";
import slugify from "slugify";
import Button from "../../components/button/Button";
import Radio from "../../components/checkbox/Radio";
import Field from "../../components/field/Field";
import Input from "../../components/input/Input";
import Label from "../../components/label/Label";
import { toast } from "react-toastify";
import { db } from "../../firebase/firebase-config";
import { categoryStatus } from "../../utils/constants";
import DashboardHeading from "../dashboard/DashboardHeading";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object({
    name: yup.string().required("Please enter the category name"),
});

function CategoryUpdate() {
    const {
        control,
        handleSubmit,
        watch,
        reset,
        formState: { isSubmitting, isValid, errors },
    } = useForm({
        mode: "onChange",
        defaultValues: {},
        resolver: yupResolver(schema),
    });

    const navigate = useNavigate();

    const [param] = useSearchParams();
    const categoryId = param.get("id");

    useEffect(() => {
        document.title = "Update category";
    }, []);

    useEffect(() => {
        async function fetchData() {
            const colRef = doc(db, "categories", categoryId);
            const singleDoc = await getDoc(colRef);
            reset(singleDoc.data());
        }
        fetchData();
    }, [categoryId, reset]);

    const watchStatus = watch("status");

    const handleUpdateCategory = async (values) => {
        if (!isValid) return;
        const colRef = doc(db, "categories", categoryId);
        await updateDoc(colRef, {
            name: values.name,
            slug: slugify(values.slug || values.name, { lower: true }),
            status: Number(values.status),
        });
        toast.success("Update successfully!");
        navigate("/manage/category");
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

    if (!categoryId) return null;

    return (
        <div>
            <DashboardHeading
                title="Update category"
                desc={`Update your category id: ${categoryId}`}
            ></DashboardHeading>
            <form
                onSubmit={handleSubmit(handleUpdateCategory)}
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
                    Update category
                </Button>
            </form>
        </div>
    );
}

export default CategoryUpdate;
