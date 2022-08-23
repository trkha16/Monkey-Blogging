import styled from "styled-components";
import Button from "../../components/button/Button";

const HomeBannerStyles = styled.div`
    width: 100%;
    height: 520px;
    background-image: linear-gradient(
        to right bottom,
        ${(props) => props.theme.primary},
        ${(props) => props.theme.secondary}
    );
    margin-bottom: 60px;
    .container {
        height: 100%;
    }
    .banner {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 100%;
    }
    .banner-content {
        max-width: 550px;
        color: white;
    }
    .banner-heading {
        font-size: 36px;
        margin-bottom: 20px;
    }
    .banner-desc {
        line-height: 1.75;
        margin-bottom: 40px;
    }
`;

function HomeBanner() {
    return (
        <HomeBannerStyles>
            <div className="container">
                <div className="banner">
                    <div className="banner-content">
                        <h1 className="banner-heading">Monkey Blogging</h1>
                        <p className="banner-desc">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi.
                        </p>
                        <Button to="/sign-up" kind="secondary">
                            Get started
                        </Button>
                    </div>
                    <div className="banner-image">
                        <img src="/img-banner.png" alt="banner" />
                    </div>
                </div>
            </div>
        </HomeBannerStyles>
    );
}

export default HomeBanner;
