import { useForm } from "react-hook-form";
import Button from "../../components/button/Button";
import Radio from "../../components/checkbox/Radio";
import slugify from "slugify";
import Field from "../../components/field/Field";
import Input from "../../components/input/Input";
import Label from "../../components/label/Label";
import DashboardHeading from "../dashboard/DashboardHeading";
import { categoryStatus } from "../../utils/constants";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../../firebase/firebase-config";

function CategoryAddNew() {
    const {
        control,
        handleSubmit,
        watch,
        reset,
        formState: { isValid, isSubmitting },
    } = useForm({
        mode: "onChange",
        defaultValues: {
            name: "",
            slug: "",
            status: 1,
            createdAt: new Date(),
        },
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
                        <Label>Name</Label>
                        <Input
                            control={control}
                            name="name"
                            placeholder="Enter your category name"
                        ></Input>
                    </Field>
                    <Field>
                        <Label>Slug</Label>
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
