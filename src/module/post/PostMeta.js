import styled from "styled-components";

const PostMetaStyles = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 14px;
    font-weight: 600;
    color: inherit;
    .post {
        &-dot {
            display: inline-block;
            width: 4px;
            height: 4px;
            background-color: currentColor;
            border-radius: 100rem;
        }
    }
    @media screen and (max-width: 600.98px) {
        .post-time {
            display: none;
        }
        .post-dot {
            display: none;
        }
    }
`;

function PostMeta({
    date = "Mar 23",
    authorName = "Andiez Le",
    className = "",
}) {
    return (
        <PostMetaStyles className={className}>
            <span className="post-time">{date}</span>
            <span className="post-dot"></span>
            <span className="post-author">{authorName}</span>
        </PostMetaStyles>
    );
}

export default PostMeta;
