import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getById } from "../../redux/actions/actions.js";
import "./Detail.css";

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const videogame = useSelector((state) => state.videogame);

  useEffect(() => {
    dispatch(getById(id));
  }, []);

  return (
    <div className="container-details">
      <NavLink to="/home" className="back">
        GO BACK
      </NavLink>
      <div className="header-details">
        <h1>{videogame.name}</h1>
        <img
          src={
            videogame.background_image
              ? videogame.background_image
              : videogame.image
          }
          alt={videogame.name}
          width="500px"
          className="img-detail"
        />
      </div>

      <h2 className="released">released: {videogame.released}</h2>
      <div
        dangerouslySetInnerHTML={{ __html: videogame.description }}
        className="desciption"
      ></div>
      <h2 className="released">Platforms</h2>
      <div className="plat">
        {videogame.platforms
          ? videogame.platforms.map((vg) => {
              return <div key={vg.platform.id}>{vg.platform.name}</div>;
            })
          : null}
      </div>

      {/* <h1>Stores</h1>
       {videogame.stores
        ? videogame.stores.map((st) => {
            return <div key={st.store.id}>{st.store.name}</div>;
          })
        : null}  */}
    </div>
  );
};

export default Detail;
