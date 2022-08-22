import {
    collection,
    limit,
    onSnapshot,
    query,
    where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Heading from "../../components/layout/Heading";
import { db } from "../../firebase/firebase-config";
import PostItem from "../post/PostItem";
import PostNewestItem from "../post/PostNewestItem ";
import PostNewestLarge from "../post/PostNewestLarge";

const HomeNewestStyles = styled.div`
    .layout {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        grid-gap: 40px;
        margin-bottom: 40px;
        align-items: start;
    }
    .sidebar {
        padding: 28px 20px;
        background-color: #f3edff;
        border-radius: 16px;
    }
    @media screen and (max-width: 1023.98px) {
        .layout {
            grid-template-columns: 100%;
        }
        .sidebar {
            padding: 14px 10px;
        }
    }
`;

function HomeNewest() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const colRef = collection(db, "posts");
        const queries = query(colRef, where("status", "==", "1"), limit(4));
        let results = [];
        onSnapshot(queries, (snapshot) => {
            snapshot.forEach((doc) => {
                results.push({
                    id: doc.id,
                    ...doc.data(),
                });
            });
            setPosts(results);
        });
    }, []);

    console.log("post", posts[0]);

    return (
        <HomeNewestStyles className="home-block">
            <div className="container">
                <Heading>Mới nhất</Heading>
                <div className="layout">
                    <PostNewestLarge
                        title={posts[0]?.title}
                        category={posts[0]?.category?.name}
                        image={posts[0]?.image}
                        author={posts[0]?.user}
                        data={posts[0]?.createdAt}
                        slug={posts[0]?.slug}
                    ></PostNewestLarge>
                    <div className="sidebar">
                        {posts.slice(1, 4).map((post) => (
                            <PostNewestItem
                                key={post?.id}
                                title={post?.title}
                                category={post?.category?.name}
                                image={post?.image}
                                author={post?.user}
                                data={post?.createdAt}
                                slug={post?.slug}
                            ></PostNewestItem>
                        ))}
                    </div>
                </div>
                <div className="grid-layout grid-layout--primary">
                    <PostItem></PostItem>
                    <PostItem></PostItem>
                    <PostItem></PostItem>
                    <PostItem></PostItem>
                </div>
            </div>
        </HomeNewestStyles>
    );
}

export default HomeNewest;
