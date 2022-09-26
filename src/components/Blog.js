import {
  DeleteOutline,
  FavoriteBorderOutlined,
  FavoriteRounded,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import "../App.css";

const jwt = require("jsonwebtoken");

const Blog = (props) => {
  const handleLike = (id, username) => {
    return props.likeIncrement(id, username);
  };

  const handleUnlike = (id, username) => {
    return props.likeDecrement(id, username);
  };

  const handleDelete = (id) => {
    return props.deleteBlog(id);
  };

  let tokenReq = JSON.parse(localStorage.getItem("loggedInBlogUser"));
  let token = tokenReq.token;
  let loggedusername = tokenReq.username;

  let decodedToken = jwt.decode(token, process.env.REACT_APP_SECRET);
  let decodedId = decodedToken.id;

  return (
    <div className="blogItems">
      <p className="mobileDateContent">
        {new Date(props.blog.timeStamp).toDateString()}
      </p>
      <h1 className="blogTitle">{props.blog.title}</h1>
      <br />
      <p className="blogContent">{props.blog.content.substr(0, 150)} ...</p>
      <p className="readMoreContent">
        <Link to={`/blogs/${props.blog.id}`}>Read more</Link>
      </p>
      <br />
      <p className="authorContent">Author : {props.blog.user.name}</p>

      <p className="iconsDiv">
        {props.blog.likersList.includes(loggedusername) ? (
          <FavoriteRounded
            style={{ color: "red" }}
            className="liked"
            onClick={() => handleUnlike(props.blog.id, loggedusername)}
          />
        ) : (
          <FavoriteBorderOutlined
            className="notLiked"
            color="error"
            onClick={() => {
              handleLike(props.blog.id, loggedusername);
            }}
          />
        )}

        {props.blog.likes}
        {decodedId === props.blog.user.id ? (
          <DeleteOutline
            className="deleteIcon"
            color="primary"
            onClick={() => handleDelete(props.blog.id)}
          />
        ) : null}
      </p>
      {/* </Togglable> */}
      <br />
    </div>
  );
};

export default Blog;
