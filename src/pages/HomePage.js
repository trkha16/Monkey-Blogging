import styled from "styled-components";
import Layout from "../components/layout/Layout";
import HomeBanner from "../module/home/HomeBanner";

const HomePageStyles = styled.div``;

function HomePage() {
    return (
        <HomePageStyles>
            <Layout>
                <HomeBanner></HomeBanner>
            </Layout>
        </HomePageStyles>
    );
}

export default HomePage;
