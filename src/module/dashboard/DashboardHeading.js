function DashboardHeading({ title = "", desc = "", children }) {
    return (
        <div className="mb-10 flex items-center justify-between">
            <div>
                <h1 className="dashboard-heading">{title}</h1>
                <p className="dashboard-short-desc"></p>
            </div>
            {children}
        </div>
    );
}

export default DashboardHeading;
