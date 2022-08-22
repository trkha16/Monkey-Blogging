import {
    collection,
    deleteDoc,
    doc,
    onSnapshot,
    query,
    where,
} from "firebase/firestore";
import { debounce } from "lodash";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ActionDelete from "../../components/action/ActionDelete";
import ActionEdit from "../../components/action/ActionEdit";
import ActionView from "../../components/action/ActionView";
import Button from "../../components/button/Button";
import Table from "../../components/table/Table";
import { db } from "../../firebase/firebase-config";
import DashboardHeading from "../dashboard/DashboardHeading";

const PostManage = () => {
    const navigate = useNavigate();

    const [postList, setPostList] = useState([]);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        const colRef = collection(db, "posts");
        const q = filter
            ? query(
                  colRef,
                  where("title", ">=", filter),
                  where("title", "<=", filter + "utf8")
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
            setPostList(results);
        });
    }, [filter]);

    const handleDeletePost = async (postId) => {
        const docRef = doc(db, "posts", postId);
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
                await deleteDoc(docRef);
                Swal.fire("Deleted!", "Your file has been deleted.", "success");
            }
        });
    };

    const handleSearchPost = debounce((e) => {
        setFilter(e.target.value);
    }, 500);

    useEffect(() => {
        document.title = "Post";
    }, []);

    return (
        <div>
            <DashboardHeading title="All posts" desc="Manage all posts">
                <div className="flex gap-x-10">
                    <div className="mb-10">
                        <div className="w-full max-w-[300px]">
                            <input
                                type="text"
                                className="w-full py-4 px-5 rounded-lg border border-solid border-gray-300"
                                placeholder="Search post..."
                                onChange={handleSearchPost}
                            />
                        </div>
                    </div>
                    <Button
                        to="/manage/add-post"
                        className="header-button"
                        height="58px"
                    >
                        Write new post
                    </Button>
                </div>
            </DashboardHeading>

            <Table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Post</th>
                        <th>Category</th>
                        <th>Author</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {postList.length > 0 &&
                        postList.map((post) => {
                            const date = post.createdAt
                                ? new Date(post?.createdAt?.seconds * 1000)
                                : new Date();
                            const formatDate = new Date(
                                date
                            ).toLocaleDateString("vi-VI");

                            return (
                                <tr key={post.id}>
                                    <td>{post.id.slice(0, 5) + "..."}</td>
                                    <td>
                                        <div className="flex items-center gap-x-3">
                                            <img
                                                src={post.image}
                                                alt=""
                                                className="w-[66px] h-[55px] rounded object-cover"
                                            />
                                            <div className="flex-1">
                                                <h3 className="font-semibold">
                                                    {post.title}
                                                </h3>
                                                <time className="text-sm text-gray-500">
                                                    Date: {formatDate}
                                                </time>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span className="text-gray-500">
                                            {post.category?.name}
                                        </span>
                                    </td>
                                    <td>
                                        <span className="text-gray-500">
                                            {post.user?.username}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-x-3 text-gray-500">
                                            <ActionView
                                                onClick={() =>
                                                    navigate(`/${post.slug}`)
                                                }
                                            ></ActionView>
                                            <ActionEdit
                                                onClick={() =>
                                                    navigate(
                                                        `/manage/update-post?id=${post.id}`
                                                    )
                                                }
                                            ></ActionEdit>
                                            <ActionDelete
                                                onClick={() =>
                                                    handleDeletePost(post.id)
                                                }
                                            ></ActionDelete>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
            </Table>
        </div>
    );
};

export default PostManage;
