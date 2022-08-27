import styled from "styled-components";
import PostTitle from "./PostTitle";
import PostMeta from "./PostMeta";
import PostImage from "./PostImage";
import PostCategory from "./PostCategory";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase-config";

const PostFeatureItemStyles = styled.div`
    width: 100%;
    border-radius: 16px;
    position: relative;
    height: 169px;
    overflow-y: hidden;
    .post {
        &-image {
            width: 100%;
            height: 100%;
            border-radius: 16px;
        }
        &-overlay {
            position: absolute;
            inset: 0;
            border-radius: 16px;
            background: linear-gradient(
                179.77deg,
                #6b6b6b 36.45%,
                rgba(163, 163, 163, 0.622265) 63.98%,
                rgba(255, 255, 255, 0) 99.8%
            );
            mix-blend-mode: multiply;
            opacity: 0.6;
        }
        &-content {
            position: absolute;
            inset: 0;
            z-index: 10;
            padding: 20px;
            color: white;
        }
        &-top {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 16px;
        }
    }
    @media screen and (min-width: 1024px) {
        height: 272px;
    }
`;

function PostFeatureItem({ data }) {
    const date = data.createdAt
        ? new Date(data?.createdAt?.seconds * 1000)
        : new Date();
    const formatDate = new Date(date).toLocaleDateString("vi-VI");

    const { category, user } = data;

    const [userInfo, setUserInfo] = useState();
    useEffect(() => {
        async function fetchUserData() {
            if (!user?.id) return;
            const docRef = doc(db, "users", user?.id);
            const docSnapshot = await getDoc(docRef);
            setUserInfo(docSnapshot.data());
        }
        fetchUserData();
    }, [user?.id]);

    if (!data || !data.id) return null;

    return (
        <PostFeatureItemStyles>
            <PostImage
                url={data.image}
                alt="unsplash"
                className="post-image"
            ></PostImage>
            <div className="post-overlay"></div>
            <div className="post-content">
                <div className="post-top">
                    {category?.name && (
                        <PostCategory>{category.name}</PostCategory>
                    )}
                    <PostMeta
                        authorName={userInfo?.fullname}
                        date={formatDate}
                    ></PostMeta>
                </div>
                <PostTitle
                    size="big"
                    className="inline-block"
                    to={`/${data.slug}`}
                >
                    {data.title}
                </PostTitle>
            </div>
        </PostFeatureItemStyles>
    );
}

export default PostFeatureItem;
