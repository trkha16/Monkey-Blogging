import styled from "styled-components";
import Heading from "../../components/layout/Heading";
import PostItem from "../post/PostItem";
import PostNewestItem from "../post/PostNewestItem ";
import PostNewestLarge from "../post/PostNewestLarge";

const HomeNewestStyles = styled.div``;

function HomeNewest() {
    return (
        <HomeNewestStyles className="home-block">
            <div className="container">
                <Heading>Mới nhất</Heading>
                <div className="layout">
                    <PostNewestLarge></PostNewestLarge>
                    <div className="sidebar">
                        <PostNewestItem></PostNewestItem>
                        <PostNewestItem></PostNewestItem>
                        <PostNewestItem></PostNewestItem>
                    </div>
                </div>
                <div className="grid-layout grid-layout--primary">
                    <PostItem></PostItem>
                    <PostItem></PostItem>
                    <PostItem></PostItem>
                </div>
            </div>
        </HomeNewestStyles>
    );
}

export default HomeNewest;
