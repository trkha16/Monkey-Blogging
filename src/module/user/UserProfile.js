import { useForm } from "react-hook-form";
import Field from "../../components/field/Field";
import ImageUpload from "../../components/image/ImageUpload";
import Input from "../../components/input/Input";
import Label from "../../components/label/Label";
import DashboardHeading from "../dashboard/DashboardHeading";

function UserProfile() {
    const { control } = useForm({
        mode: "onChange",
    });

    return (
        <div>
            <DashboardHeading
                title="Account information"
                desc="Update your account information"
            ></DashboardHeading>
            <form>
                <div className="text-center mb-10">
                    <ImageUpload className="w-[200px] h-[200px] !rounded-full min-h-0 mx-auto"></ImageUpload>
                </div>
                <div className="form-layout">
                    <Field>
                        <Label>Fullname</Label>
                        <Input
                            control={control}
                            name="fullname"
                            placeholder="Enter your fullname"
                        ></Input>
                    </Field>
                    <Field>
                        <Label>Username</Label>
                        <Input
                            control={control}
                            name="username"
                            placeholder="Enter your username"
                        ></Input>
                    </Field>
                </div>
                <div className="form-layout">
                    <Field>
                        <Label>Date of birth</Label>
                        <Input
                            control={control}
                            name="birthday"
                            placeholder="dd/mm/yyyy"
                        ></Input>
                    </Field>
                    <Field>
                        <Label>Mobile number</Label>
                        <Input
                            control={control}
                            name="phone"
                            placeholder="Enter your phone number"
                        ></Input>
                    </Field>
                </div>
            </form>
        </div>
    );
}

export default UserProfile;
