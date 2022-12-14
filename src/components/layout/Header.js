import styled from "styled-components";
import Button from "../button/Button";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth-context";

const HeaderStyles = styled.header`
    padding: 40px 0;
    width: 100%;
    .header-main {
        display: flex;
        align-items: center;
    }
    .logo {
        display: block;
        max-width: 50px;
    }
    .menu {
        display: flex;
        align-items: center;
        gap: 20px;
        margin-left: 40px;
        list-style-type: none;
    }
    .search {
        margin-left: auto;
        width: 100%;
        max-width: 320px;
        padding: 15px 25px;
        border: 2px solid #eee;
        border-radius: 8px;
        display: flex;
        align-items: center;
        position: relative;
        margin-right: 5px;
    }
    .search-input {
        flex: 1;
        padding-right: 45px;
    }
    .search-icon {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 25px;
    }
    .header-button {
        margin-left: 20px;
    }
    @media screen and (max-width: 1023.98px) {
        .search {
            display: none;
        }
        .header-button {
            display: none;
        }
    }
`;

function Header() {
    const { userInfo } = useAuth();

    const navigate = useNavigate();

    return (
        <HeaderStyles>
            <div className="container">
                <div className="header-main">
                    <NavLink to="/">
                        <img
                            srcSet="/logo.png 2x"
                            alt="monkey-blogging"
                            className="logo"
                        />
                    </NavLink>
                    <ul className="menu">
                        {menuLinks.map((item) => (
                            <li className="menu-item" key={item.title}>
                                <div
                                    className="menu-link cursor-pointer"
                                    onClick={() => navigate(`${item.url}`)}
                                >
                                    {item.title}
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="search">
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Search posts..."
                        />
                        <span className="search-icon">
                            <svg
                                width="18"
                                height="17"
                                viewBox="0 0 18 17"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <ellipse
                                    cx="7.66669"
                                    cy="7.05161"
                                    rx="6.66669"
                                    ry="6.05161"
                                    stroke="#999999"
                                    strokeWidth="1.5"
                                />
                                <path
                                    d="M17.0001 15.5237L15.2223 13.9099L14.3334 13.103L12.5557 11.4893"
                                    stroke="#999999"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                />
                                <path
                                    d="M11.6665 12.2964C12.9671 12.1544 13.3706 11.8067 13.4443 10.6826"
                                    stroke="#999999"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </span>
                    </div>
                    <div className="header-button">
                        {!userInfo ? (
                            <Button
                                type="button"
                                style={{ maxWidth: "200px" }}
                                className="header-button"
                                height="56px"
                                to="/sign-in"
                            >
                                Sign In
                            </Button>
                        ) : (
                            <Button
                                type="button"
                                style={{ maxWidth: "200px" }}
                                className="header-button"
                                height="56px"
                                to="/manage/post"
                            >
                                Dashboard
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </HeaderStyles>
    );
}

export default Header;

const menuLinks = [
    {
        url: "/",
        title: "Home",
    },
    {
        url: "/blog",
        title: "Blog",
    },
    {
        url: "/contact",
        title: "Contact",
    },
];
