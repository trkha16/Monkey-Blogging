import { useEffect } from "react";
import styled from "styled-components";
import Layout from "../components/layout/Layout";
import HomeBanner from "../module/home/HomeBanner";
import HomeFeature from "../module/home/HomeFeature";
import HomeNewest from "../module/home/HomeNewest";

const HomePageStyles = styled.div`
    width: 100%;
`;

function HomePage() {
    useEffect(() => {
        document.title = "Monkey Blogging";
    }, []);

    return (
        <HomePageStyles>
            <Layout>
                <HomeBanner></HomeBanner>
                <HomeFeature></HomeFeature>
                <HomeNewest></HomeNewest>
            </Layout>
        </HomePageStyles>
    );
}

export default HomePage;
