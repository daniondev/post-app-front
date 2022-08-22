import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { loadPostThunk, deletePostThunk } from "../features/post";

function PostList() {
  const { isLoading, posts, filteredPosts } = useSelector(
    (state) => state.post
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadPostThunk());
  }, [dispatch]);

  // const prevDisabled = page <= 0 ? true : false;
  // const nextDisabled = false;

  return (
    <div>
      <div className="container">
        <table className="table table-striped">
          <thead>
            <tr>
              <th className="col-3 text-left">Nombre</th>
              <th className="col-6 text-left">Descripción</th>
              <th className="col-3">Acción</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="4" className="col-12 text-center">
                  Cargando...
                </td>
              </tr>
            ) : (
              filteredPosts.map((post) => (
                <tr key={post.id}>
                  <td className="col-3 text-left">{post.nombre}</td>
                  <td className="col-6 text-left">{post.descripcion}</td>
                  <td className="col-3 text-center">
                    <button
                      className="btn btn-light"
                      onClick={() => dispatch(deletePostThunk(posts, post, filteredPosts))}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {/* <button disabled={prevDisabled} onClick={() => dispatch(readPostThunk(page - 1))} className="btn btn-light">
          Prev
        </button>
        <button disabled={nextDisabled} onClick={() => dispatch(readPostThunk(page + 1))} className="btn btn-light">
          Next
        </button> */}
      </div>
    </div>
  );
}

export default PostList;
