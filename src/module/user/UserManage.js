import { useEffect } from "react";
import DashboardHeading from "../dashboard/DashboardHeading";
import UserTable from "./UserTable";

function UserManage() {
    useEffect(() => {
        document.title = "User";
    }, []);

    return (
        <div>
            <DashboardHeading title="Users" desc="Manage your info">
                {/* <Button type="button" to="/manage/update-user">
                    Update user
                </Button> */}
            </DashboardHeading>
            <UserTable></UserTable>
        </div>
    );
}

export default UserManage;
