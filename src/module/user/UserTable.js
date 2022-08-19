import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ActionDelete from "../../components/action/ActionDelete";
import ActionEdit from "../../components/action/ActionEdit";
import LabelStatus from "../../components/label/LabelStatus";
import Table from "../../components/table/Table";
import { db } from "../../firebase/firebase-config";
import { userRole, userStatus } from "../../utils/constants";

function UserTable() {
    const navigate = useNavigate();

    const [userList, setUserList] = useState([]);

    useEffect(() => {
        const colRef = collection(db, "users");
        onSnapshot(colRef, (snapshot) => {
            const resulst = [];
            snapshot.forEach((doc) => {
                resulst.push({
                    id: doc.id,
                    ...doc.data(),
                });
            });
            setUserList(resulst);
        });
    }, []);

    const renderLabelStatus = (status) => {
        switch (status) {
            case userStatus.ACTIVE:
                return <LabelStatus type="success">Active</LabelStatus>;
            case userStatus.PENDING:
                return <LabelStatus type="warning">Pending</LabelStatus>;
            case userStatus.BAN:
                return <LabelStatus type="danger">Rejected</LabelStatus>;
            default:
                break;
        }
    };

    const renderLabelRole = (role) => {
        switch (role) {
            case userRole.ADMIN:
                return "ADMIN";
            case userRole.MOD:
                return "MOD";
            case userRole.USER:
                return "USER";
            default:
                break;
        }
    };

    return (
        <div>
            <Table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Info</th>
                        <th>Username</th>
                        <th>Email address</th>
                        <th>Status</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {userList.length > 0 &&
                        userList.map((user) => (
                            <tr key={user.id}>
                                <td title={user.id}>
                                    {user.id.slice(0, 5) + "..."}
                                </td>
                                <td className="whitespace-nowrap">
                                    <div className="flex items-center gap-x-3">
                                        <img
                                            src={user?.avatar}
                                            alt=""
                                            className="w-10 h-10 object-cover rounded-md flex-shrink-0"
                                        />
                                        <div className="flex-1">
                                            <h3>{user.fullname}</h3>
                                            <time className="text-sm text-gray-400">
                                                {new Date(
                                                    user?.createdAt?.seconds *
                                                        1000
                                                ).toLocaleDateString("vi-VI")}
                                            </time>
                                        </div>
                                    </div>
                                </td>
                                <td>{user?.username}</td>
                                <td title={user.email}>
                                    {user.email.slice(0, 5) + "..."}
                                </td>
                                <td>{renderLabelStatus(user?.status)}</td>
                                <td>{renderLabelRole(Number(user?.role))}</td>
                                <td>
                                    <div className="flex items-center gap-x-3">
                                        <ActionEdit
                                            onClick={() =>
                                                navigate(
                                                    `/manage/update-user?id=${user.id}`
                                                )
                                            }
                                        ></ActionEdit>
                                        <ActionDelete
                                        // onClick={() =>
                                        //     handleDeleteCategory(user.id)
                                        // }
                                        ></ActionDelete>
                                    </div>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </Table>
        </div>
    );
}

export default UserTable;
