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
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase/firebase-config";
import parse from "html-react-parser";

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

    if (!slug) return <NotFoundPage></NotFoundPage>;
    if (!postInfo.title) return null;

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
                            <PostMeta></PostMeta>
                        </div>
                    </div>
                    <div className="post-content">
                        <div className="entry-content">
                            {parse(postInfo.content || "")}
                        </div>
                        <div className="author">
                            <div className="author-image">
                                <img src={user?.avatar} alt="" />
                            </div>
                            <div className="author-content">
                                <h3 className="author-name">
                                    {user?.fullname}
                                </h3>
                                <p className="author-desc">
                                    {user?.description}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="post-related">
                        <Heading>Bài viết liên quan</Heading>
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
