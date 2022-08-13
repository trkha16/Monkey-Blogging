import { Fragment, useState } from "react";
import IconEyeClose from "../icon/IconEyeClose";
import IconEyeOpen from "../icon/IconEyeOpen";
import Input from "./Input";

function InputPasswordToggle({ control }) {
    const [togglePassword, setTogglePassword] = useState(false);
    if (!control) return null;

    return (
        <Fragment>
            <Input
                type={togglePassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                control={control}
                hasIcon
            >
                {!togglePassword ? (
                    <IconEyeClose
                        className="input-icon"
                        onClick={() => setTogglePassword(true)}
                    ></IconEyeClose>
                ) : (
                    <IconEyeOpen
                        className="input-icon"
                        onClick={() => setTogglePassword(false)}
                    ></IconEyeOpen>
                )}
            </Input>
        </Fragment>
    );
}

export default InputPasswordToggle;
