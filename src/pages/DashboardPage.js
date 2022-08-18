import styled from "styled-components";
import DashboardHeading from "../module/dashboard/DashboardHeading";

const DashboardPageStyles = styled.div``;
function DashboardPage() {
    return (
        <DashboardPageStyles>
            <h1 className="dashboard-heading">Dashboard page</h1>
            <DashboardHeading
                title="Dashboard"
                desc="Overview dashboard monitor"
            ></DashboardHeading>
        </DashboardPageStyles>
    );
}

export default DashboardPage;
