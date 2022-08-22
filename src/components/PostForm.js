import { useState } from "react";
import { useDispatch } from "react-redux";
import { createPostThunk } from "../features/post";

const stylePostForm = {
  button: {
    width: "90px",
  },
};

function PostForm() {
  const initialState = {
    nombre: "",
    descripcion: "",
  };

  const [post, setPost] = useState(initialState);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    //console.log(e.target.name, e.target.value)
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(createPostThunk(post));
    setPost(initialState);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="container">
          <hr />
          <div className="row">
            <div className="col text-left">
              <input
                type="text"
                name="nombre"
                value={post.nombre}
                placeholder="Nombre"
                autoComplete="off"
                className="form-control"
                onChange={handleChange}
              />
            </div>
            <div className="col text-left">
              <textarea
                name="descripcion"
                value={post.descripcion}
                cols="24"
                rows="1"
                placeholder="Descripción"
                className="form-control"
                onChange={handleChange}
              />
            </div>
            <div className="col text-right">
              <button
                className="btn btn-secondary"
                style={stylePostForm.button}
              >
                Crear
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default PostForm;
