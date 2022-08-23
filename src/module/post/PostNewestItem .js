import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "../../firebase/firebase-config";
import PostCategory from "./PostCategory";
import PostImage from "./PostImage";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";

const PostNewestItemStyles = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 28px;
    padding-bottom: 28px;
    border-bottom: 1px solid #ccc;
    &:last-child {
        padding-bottom: 0;
        margin-bottom: 0;
        border-bottom: 0;
    }
    .post {
        &-image {
            display: block;
            flex-shrink: 0;
            width: 180px;
            height: 130px;
            border-radius: 12px;
        }
        &-category {
            margin-bottom: 8px;
        }
        &-title {
            margin-bottom: 8px;
        }
    }
    @media screen and (max-width: 600.98px) {
        align-items: center;
        .post-image {
            width: 100px;
            min-height: 100px;
            height: 100%;
        }
    }
`;
const PostNewestItem = ({
    title = "Setup phòng học cực chill",
    category = "Kiến thức",
    image = "https://phukienmaytinh.vn/wp-content/uploads/2021/07/phong-game-tai-nha-6-a6e4-min.jpg",
    author,
    date,
    slug,
}) => {
    const [userInfo, setUserInfo] = useState();
    useEffect(() => {
        async function fetchUserData() {
            if (!author?.id) return;
            const docRef = doc(db, "users", author?.id);
            const docSnapshot = await getDoc(docRef);
            setUserInfo(docSnapshot.data());
        }
        fetchUserData();
    }, [author?.id]);

    const dateOfPost = date ? new Date(date?.seconds * 1000) : new Date();
    const formatDate = new Date(dateOfPost).toLocaleDateString("vi-VI");

    return (
        <PostNewestItemStyles>
            <PostImage
                url={image}
                alt=""
                className="post-image"
                to={`/${slug}`}
            ></PostImage>
            <div className="post-content">
                <PostCategory className="post-category" type="secondary">
                    {category}
                </PostCategory>
                <PostTitle className="post-title" to={`/${slug}`}>
                    {title}
                </PostTitle>
                <PostMeta
                    authorName={userInfo?.fullname}
                    date={formatDate}
                ></PostMeta>
            </div>
        </PostNewestItemStyles>
    );
};

export default PostNewestItem;
