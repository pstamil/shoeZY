import React from "react";
import "./NotFoundPage.css"; // Import your CSS file
import ghostImg from "../../../assets/ghost-img.png"; // Import your image
import { Container } from "@mui/material";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <Container sx={{ mt: 10 }}>
      <div className="main">
        <section className="home">
          <div className="home__container">
            <div className="home__data">
              <span style={{ fontSize: "26px" }}>Hey Buddy!!</span>
              <h1 className="home__title">Error 404</h1>
              <p className="home__description">
                We can't seem to find the page <br /> you are looking for.
              </p>
              <Link
                to=""
                className="home__button"
                style={{ textDecoration: "none" }}
              >
                Go Home
              </Link>
            </div>

            <div className="home__img">
              <img src={ghostImg} alt="404Img" />
              <div className="home__shadow"></div>
            </div>
          </div>
        </section>
      </div>
    </Container>
  );
}

export default NotFoundPage;
