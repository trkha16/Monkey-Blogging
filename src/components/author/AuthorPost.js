import { useAuth } from "../../contexts/auth-context";

function AuthorPost() {
    const { userInfo } = useAuth();

    return (
        <div className="author">
            <div className="author-image">
                <img src={userInfo?.avatar} alt="" />
            </div>
            <div className="author-content">
                <h3 className="author-name">{userInfo?.fullname}</h3>
                <p className="author-desc">{userInfo?.description}</p>
            </div>
        </div>
    );
}

export default AuthorPost;
