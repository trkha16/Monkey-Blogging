import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../contexts/auth-context";

const DashboardHeaderStyles = styled.div`
    background-color: white;
    padding: 20px;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    .sidebar-logo {
        display: flex;
        align-items: center;
        font-weight: 600;
        gap: 0 20px;
        img {
            max-width: 40px;
        }
    }
    .header-avatar {
        width: 52px;
        height: 52px;
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 100rem;
        }
    }
`;

function DashboardHeader() {
    const navigate = useNavigate();

    const { userInfo } = useAuth();

    return (
        <DashboardHeaderStyles>
            <div
                className="sidebar-logo cursor-pointer"
                onClick={() => {
                    navigate("/");
                }}
            >
                <img srcSet="/logo.png 2x" alt="" />
                <span>Mongkey Blogging</span>
            </div>
            <div className="flex justify-between items-center">
                <div className="mr-5">
                    <span>Hello, </span>
                    <strong>{userInfo.fullname}</strong>
                </div>
                <div className="header-avatar">
                    <img src={userInfo?.avatar} alt="" />
                </div>
            </div>
        </DashboardHeaderStyles>
    );
}

export default DashboardHeader;
