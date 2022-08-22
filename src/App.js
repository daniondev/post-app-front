import "./App.css";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";
import PostFilter from "./components/PostFilter";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { readPostThunk } from "./features/post";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(readPostThunk());
  }, [dispatch]);

  return (
    <div className="App">
      <h1>Posts App</h1>
      <PostFilter />
      <PostList />
      <PostForm />
    </div>
  );
}

export default App;
