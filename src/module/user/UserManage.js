import DashboardHeading from "../dashboard/DashboardHeading";
import UserTable from "./UserTable";

function UserManage() {
    return (
        <div>
            <DashboardHeading
                title="Users"
                desc="Manage your info"
            ></DashboardHeading>
            <UserTable></UserTable>
        </div>
    );
}

export default UserManage;
