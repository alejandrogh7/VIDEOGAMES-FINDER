import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getById } from "../../redux/actions/actions.js";

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const videogame = useSelector((state) => state.videogame);

  useEffect(() => {
    dispatch(getById(id));
  }, []);

  return (
    <div>
      <NavLink to="/home">GO BACK</NavLink>
      <h1>{videogame.name}</h1>
      <img
        src={videogame.background_image}
        alt={videogame.name}
        width="500px"
      />
      <h2>released: {videogame.released}</h2>
      <div dangerouslySetInnerHTML={{ __html: videogame.description }}></div>
      <h1>Platforms</h1>
      {videogame.platforms
        ? videogame.platforms.map((vg) => {
            return <div key={vg.platform.id}>{vg.platform.name}</div>;
          })
        : null}
      <h1>Stores</h1>
      {videogame.stores
        ? videogame.stores.map((st) => {
            return <div key={st.store.id}>{st.store.name}</div>;
          })
        : null}
    </div>
  );
};

export default Detail;
