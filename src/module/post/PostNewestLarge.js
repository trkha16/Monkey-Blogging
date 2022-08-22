import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "../../firebase/firebase-config";
import PostCategory from "./PostCategory";
import PostImage from "./PostImage";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";
const PostNewestLargeStyles = styled.div`
    .post {
        &-image {
            display: block;
            margin-bottom: 16px;
            height: 433px;
            border-radius: 16px;
        }
        &-category {
            margin-bottom: 10px;
        }
        &-title {
            margin-bottom: 10px;
        }
    }
`;

const PostNewestLarge = ({
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
        <PostNewestLargeStyles>
            <PostImage
                url={image}
                alt=""
                className="post-image"
                to={`/${slug}`}
            ></PostImage>
            <PostCategory className="post-category">{category}</PostCategory>
            <PostTitle size="big" className="post-title" to={`/${slug}`}>
                {title}
            </PostTitle>
            <PostMeta
                authorName={userInfo?.fullname}
                date={formatDate}
            ></PostMeta>
        </PostNewestLargeStyles>
    );
};

export default PostNewestLarge;
