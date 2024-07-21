import React from "react";

import { Link } from "react-router-dom";

import LikedMusic from "./LikedMusic";


const Navbar = () => {

  

  return (
    <>
      <nav className="navbar navbar-dark navbar-expand-lg bg-dark sticky-top">
        <div className="container-fluid">
          <Link className="navbar-brand hidden md:block" to="/">
            <i className="bi bi-music-note-list mx-3"></i> music
          </Link>
          <div>
        
            <button
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#likedMusicModal"
              className="btn btn-secondary btn-sm mx-1"
            >
              <i className="bi bi-heart-fill"></i>
            </button>
          </div>

         
          <input
           
      
          
            className="form-control me-2 hidden md:w-75  "
            type="search"
            placeholder="Search"
            aria-label="Search"

          />
          <button
            onClick={() => {
             
            }}
            className="btn btn-outline-success hidden md:block"
          >
            Search
          </button>
          {/* </div> */}
        </div>
      </nav>

      <div
        className="modal fade modal-xl"
        id="exampleModal"
        tabIndex={1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">

              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">

            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade modal-xl"
        id="likedMusicModal"
        tabIndex={1}
        aria-labelledby="likedMusicModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="likedMusicModalLabel">
                Liked Music
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <LikedMusic />
            </div>
          </div>
        </div>
      </div>
  
    </>
  );
};

export default Navbar;
