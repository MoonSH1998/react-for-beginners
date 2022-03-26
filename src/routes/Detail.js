import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
function Detail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState([]);
  const getMovie = async () => {
    const json1 = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    console.log(json1.data.movie);
    setMovie(json1.data.movie);
    setLoading(false);
    console.log(movie);
  };
  useEffect(() => {
    getMovie();
  }, []);
  return (
    <div>
      {loading ? (
        <h1>Loading ...</h1>
      ) : (
        <div>
          <Link to={`/`}>
            <h2>&larr; home</h2>
          </Link>
          <h1>title: {movie.title}</h1>
          <img src={movie.medium_cover_image} />

          <h2>Summary</h2>
          <p>{movie.description_full}</p>
          <small>
            genres
            <ul>
              {movie.genres.map((g) => (
                <li key={g}>{g}</li>
              ))}
            </ul>
          </small>
        </div>
      )}
    </div>
  );
}
export default Detail;
