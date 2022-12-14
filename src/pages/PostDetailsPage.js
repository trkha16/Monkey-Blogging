import styled from "styled-components";
import PostImage from "../module/post/PostImage";
import Layout from "../components/layout/Layout";
import PostCategory from "../module/post/PostCategory";
import PostMeta from "../module/post/PostMeta";
import Heading from "../components/layout/Heading";
import PostItem from "../module/post/PostItem";
import { useParams } from "react-router-dom";
import NotFoundPage from "./NotFoundPage";
import { useEffect, useState } from "react";
import {
    collection,
    doc,
    getDoc,
    onSnapshot,
    query,
    where,
} from "firebase/firestore";
import { db } from "../firebase/firebase-config";
import parse from "html-react-parser";
import AuthorPost from "../components/author/AuthorPost";

const PostDetailsPageStyles = styled.div`
    padding-bottom: 100px;
    .post {
        &-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 40px;
            margin: 40px 0;
        }
        &-feature {
            width: 100%;
            max-width: 640px;
            height: 466px;
            border-radius: 20px;
        }
        &-heading {
            font-weight: bold;
            font-size: 36px;
            margin-bottom: 16px;
        }
        &-info {
            flex: 1;
        }
        &-content {
            max-width: 700px;
            margin: 80px auto;
        }
    }
    .author {
        margin-top: 40px;
        margin-bottom: 80px;
        display: flex;
        border-radius: 20px;
        background-color: ${(props) => props.theme.grayF3};
        &-image {
            width: 200px;
            height: 200px;
            flex-shrink: 0;
            border-radius: inherit;
            img {
                width: 100%;
                height: 100%;
                border-radius: inherit;
                object-fit: cover;
            }
        }
        &-content {
            flex: 1;
            padding: 20px;
        }
        &-name {
            font-weight: bold;
            margin-bottom: 10px;
            font-size: 20px;
        }
        &-desc {
            font-size: 14px;
            line-height: 2;
        }
    }
    @media screen and (max-width: 1023.98px) {
        padding-bottom: 40px;
        .post {
            &-header {
                flex-direction: column;
            }
            &-feature {
                height: auto;
            }
            &-heading {
                font-size: 26px;
            }
            &-content {
                margin: 40px auto;
            }
        }
        .author {
            flex-direction: column;
            &-image {
                width: 100%;
                height: auto;
            }
        }
    }
`;

function PostDetailsPage() {
    const { slug } = useParams();

    const [postInfo, setPostInfo] = useState({});
    useEffect(() => {
        async function fetchData() {
            if (!slug) return;
            const colRef = query(
                collection(db, "posts"),
                where("slug", "==", slug)
            );

            onSnapshot(colRef, (snapshot) => {
                snapshot.forEach((doc) => {
                    doc.data() && setPostInfo(doc.data());
                });
            });
        }
        fetchData();
    }, [slug]);

    const { user } = postInfo;
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

    const date = postInfo.createdAt
        ? new Date(postInfo?.createdAt?.seconds * 1000)
        : new Date();
    const formatDate = new Date(date).toLocaleDateString("vi-VI");

    if (!slug) return <NotFoundPage></NotFoundPage>;
    if (!postInfo.title) return <NotFoundPage></NotFoundPage>;

    return (
        <PostDetailsPageStyles>
            <Layout>
                <div className="container">
                    <div className="post-header">
                        <PostImage
                            url={postInfo.image}
                            className="post-feature"
                        ></PostImage>
                        <div className="post-info">
                            <PostCategory className="mb-6">
                                {postInfo.category?.name}
                            </PostCategory>
                            <h1 className="post-heading">{postInfo.title}</h1>
                            <PostMeta
                                authorName={userInfo?.fullname}
                                date={formatDate}
                            ></PostMeta>
                        </div>
                    </div>
                    <div className="post-content">
                        <div className="entry-content">
                            {parse(postInfo.content || "")}
                        </div>
                        <AuthorPost userInfo={userInfo}></AuthorPost>
                    </div>
                    <div className="post-related">
                        <Heading>B??i vi???t li??n quan</Heading>
                        <div className="grid-layout grid-layout--primary">
                            <PostItem></PostItem>
                            <PostItem></PostItem>
                            <PostItem></PostItem>
                            <PostItem></PostItem>
                        </div>
                    </div>
                </div>
            </Layout>
        </PostDetailsPageStyles>
    );
}

export default PostDetailsPage;
