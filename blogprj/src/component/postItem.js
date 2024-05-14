import "../assets/blog_style.css";
import image from "../assets/icons/image.png";
import styled from "styled-components";

export default function PostItem(props) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="blog_style.css" />
        <link rel="stylesheet" href="blog_footer.css" />
        <link rel="stylesheet" href="blog_main_header.css" />
      </head>
      <body>
        <header>
          <img class="header-icon" src="./icons/bars.png" />
          <h1>
            <a href="./blog.html"> 보드메이커스 </a>
          </h1>
          <img class="header-icon" src="./icons/search.png" />
        </header>
        <main>
          <section id="main-header" class="flex-space-between">
            <div class="flex-space-between">
              <p>전체 글</p>
              <p>(3)</p>
              <a id="post-btn" href="./post_writer.html">
                게시글 작성
              </a>
            </div>
            <div>
              <img class="main-icon" src="./icons/grid.png" />
              <img class="main-icon" src="./icons/bars.png" />
            </div>
          </section>
          <section id="main-body">
            <Post>
              <PostContent>
                <PostTitle>{props.title}</PostTitle>
                <PostContentBody>{props.content}</PostContentBody>
                <Tags>{props.tags}</Tags>
              </PostContent>
              {<img className="post-thumbnail" src={image} />}
            </Post>
          </section>
        </main>
        <footer>
          <p id="footer-content">DESIGN BY TISTORY | 관리자</p>
        </footer>
      </body>
    </html>
  );
}

const Tags = styled.p`
  color = rgb(183, 181, 181);
`;

const PostContentBody = styled.p`
  height: 50px;
`;

const PostTitle = styled.h2`
  margin: 0;
`;

const PostContent = styled.div`
  margin: 0 0;
`;

const Post = styled.a`
  height: 150px;
  width: 90%;
  padding: 40px 0;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ebebeb;
  text-decoration: none;
  color: black;
  margin: 0 5px;

  > * {
    margin: 0 10px;
  }
`;
