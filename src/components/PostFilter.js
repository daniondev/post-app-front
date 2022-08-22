import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadPostThunk } from "../features/post";

const stylePostFilter = {
  container: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  button: {
    width: "90px",
  },
};

function PostFilter() {
  const { posts } = useSelector((state) => state.post);

  const [filter, setFilter] = useState({ filtro: "" });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFilter({
      ...filter,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (filter.filtro === "") {
      dispatch(loadPostThunk(posts));
    } else {
      const newFilteredPost = posts.filter((value, index, arr) => {
        return value.nombre === filter.filtro.trim();
      });

      dispatch(loadPostThunk(newFilteredPost));
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="container" style={stylePostFilter.container}>
          <div className="row">
            <div className="col-6 text-left">
              <input
                name="filtro"
                value={filter.filtro}
                className="input-filtro form-control"
                placeholder="Filtro de Nombre"
                autoComplete="off"
                onChange={handleChange}
              />
            </div>
            <div className="col-6 text-right">
              <button
                className="btn btn-secondary"
                style={stylePostFilter.button}
              >
                Buscar
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default PostFilter;
