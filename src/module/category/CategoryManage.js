import {
    collection,
    deleteDoc,
    doc,
    onSnapshot,
    query,
    where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import ActionDelete from "../../components/action/ActionDelete";
import ActionEdit from "../../components/action/ActionEdit";
import ActionView from "../../components/action/ActionView";
import Button from "../../components/button/Button";
import LabelStatus from "../../components/label/LabelStatus";
import Table from "../../components/table/Table";
import { db } from "../../firebase/firebase-config";
import { categoryStatus } from "../../utils/constants";
import DashboardHeading from "../dashboard/DashboardHeading";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";

function CategoryManage() {
    const navigate = useNavigate();

    const [filter, setFilter] = useState("");

    const [categoryList, setCategoryList] = useState([]);
    useEffect(() => {
        const colRef = collection(db, "categories");
        const q = filter
            ? query(
                  colRef,
                  where("name", ">=", filter),
                  where("name", "<=", filter + "utf8")
              )
            : colRef;
        onSnapshot(q, (snapshot) => {
            let results = [];
            snapshot.forEach((doc) => {
                results.push({
                    id: doc.id,
                    ...doc.data(),
                });
            });
            setCategoryList(results);
        });
    }, [filter]);

    const handleDeleteCategory = async (docId) => {
        const colRef = doc(db, "categories", docId);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                await deleteDoc(colRef);
                Swal.fire("Deleted!", "Your file has been deleted.", "success");
            }
        });
    };

    const handleInputChange = debounce((e) => {
        setFilter(e.target.value);
    }, 500);

    return (
        <div>
            <DashboardHeading title="Categories" desc="Manage your category">
                <Button type="button" to="/manage/add-category">
                    Create category
                </Button>
            </DashboardHeading>
            <div className="mb-10 flex justify-end">
                <input
                    type="text"
                    placeholder="Search category..."
                    className="py-4 px-5 border border-gray-300 rounded-lg"
                    onChange={handleInputChange}
                />
            </div>
            <Table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Slug</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categoryList.length > 0 &&
                        categoryList.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>
                                    <span className="italic text-gray-400">
                                        {item.slug}
                                    </span>
                                </td>
                                <td>
                                    {item.status ===
                                        categoryStatus.APPROVED && (
                                        <LabelStatus type="success">
                                            Approved
                                        </LabelStatus>
                                    )}
                                    {item.status ===
                                        categoryStatus.UNAPPROVED && (
                                        <LabelStatus type="warning">
                                            Unapproved
                                        </LabelStatus>
                                    )}
                                </td>
                                <td>
                                    <div className="flex items-center gap-x-3">
                                        <ActionView></ActionView>
                                        <ActionEdit
                                            onClick={() =>
                                                navigate(
                                                    `/manage/update-category?id=${item.id}`
                                                )
                                            }
                                        ></ActionEdit>
                                        <ActionDelete
                                            onClick={() =>
                                                handleDeleteCategory(item.id)
                                            }
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

export default CategoryManage;
