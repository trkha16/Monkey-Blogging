import Button from "../../components/button/Button";
import DashboardHeading from "../dashboard/DashboardHeading";
import UserTable from "./UserTable";

function UserManage() {
    return (
        <div>
            <DashboardHeading title="Users" desc="Manage your info">
                <Button type="button" to="/manage/update-user">
                    Update user
                </Button>
            </DashboardHeading>
            <UserTable></UserTable>
        </div>
    );
}

export default UserManage;
