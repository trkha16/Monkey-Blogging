import { DropdownProvider } from "./dropdown-context";

function Dropdown({ children, ...props }) {
    return (
        <DropdownProvider {...props}>
            <div className="relative inline-block w-full">{children}</div>
        </DropdownProvider>
    );
}

export default Dropdown;
