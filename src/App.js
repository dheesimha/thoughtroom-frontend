import { useState, useEffect } from "react";
import Blog from "./components/Blog";
// import Notification from "./components/Notification";
import blogService from "./services/blogs";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { useMatch, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import { blogList } from "./reducers/blogReducer";
const App = () => {
  const [blogs, setBlogs] = useState([]);
  // const [errorMessage, setErrorMessage] = useState(null);
  const userArray = useSelector((state) => state.users);
  const [user, setUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [hideBackground, setHideBackground] = useState(true);

  const handleClick = (val) => {
    setHideBackground(!val);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const likeIncrement = async (id, username) => {
    // console.log(username);
    try {
      await blogService.update(id, username);
      let blogList = await blogService.getAll();
      let revBlogList = blogList.reverse(blogList);
      setBlogs(revBlogList);
    } catch (err) {
      console.log(err);
      navigate("/login");
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const likeDecrement = async (id, username) => {
    try {
      await blogService.update(id, username);
      let blogList = await blogService.getAll();
      let revBlogList = blogList.reverse();
      setBlogs(revBlogList);
    } catch (err) {
      console.log(err);
      navigate("/login");
    }
  };

  useEffect(() => {
    document.title = "All thoughts-ThoughtRoom";
  }, []);

  useEffect(() => {
    try {
      const loggedInUserJSON = window.localStorage.getItem("loggedInBlogUser");

      if (loggedInUserJSON) {
        const user = JSON.parse(loggedInUserJSON);

        setUser(user);
        setCurrentUser(userArray[userArray.length - 1]);
      }
    } catch (error) {
      navigate("/login");
    }
  }, [userArray, navigate]);

  useEffect(() => {
    blogService
      .getAll()
      .then((blog) => {
        setBlogs(blog.reverse());
      })
      .catch((error) => {
        console.log(error);
        navigate("/login");
      });
  }, [navigate]);

  const blogForm = () => {
    return blogs.map((blog) => {
      return (
        <div key={blog.id} className="blogContainer">
          <div className="innerContainer">
            <div className="design">
              <p className="dateContent">
                {new Date(blog.timeStamp).toDateString()}
              </p>
              <div className="straightLine"> </div>
            </div>
            <Blog
              key={blog.id}
              blog={blog}
              likeIncrement={() => likeIncrement(blog.id, user.username)}
              likeDecrement={() => likeDecrement(blog.id, user.username)}
              deleteBlog={() => deleteBlog(blog.id)}
              className="blogContent"
            />
            <br />
            <br />
          </div>
        </div>
      );
    });
  };

  const deleteBlog = (id) => {
    let blog = blogs.filter((blog) => blog.id === id);

    if (window.confirm(`Delete ${blog[0].title} by ${user.name}`))
      blogService.deleteBlog(id).then(window.location.reload());
  };

  const match = useMatch("/blogs/:id");

  const blog = match
    ? blogs.find((blog) => blog.id.toString() === match.params.id.toString())
    : null;

  if (blog !== null) {
    dispatch(blogList(blogs));
  }

  if (currentUser !== null) {
    return (
      <div className="pageEntire">
        <div>
          <Navbar loggedInAs={user.name} onClick={handleClick} />
          <h1 className="blogh1">
            Study, Comprehend, Decipher, Unravel all thoughts !
          </h1>
          {hideBackground ? blogForm() : null}
        </div>
      </div>
    );
  }
};

export default App;
