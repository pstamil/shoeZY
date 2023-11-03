import { Box, IconButton, Tooltip } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import footprint from "../assets/footprint.svg";

function BackToTop() {
  const [top, setTop] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 900) {
        setTop(true);
      } else {
        setTop(false);
      }
    });
  }, []);

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      {top && (
        <Tooltip
          title="Scroll to top"
          placement="top"
          data-aos="fade-up"
          data-aos-offset="100"
          data-aos-delay="50"
          data-aos-duration="1000"
          data-aos-easing="ease-in-out"
        >
          <IconButton
            disableRipple
            sx={{
              position: "fixed",
              bottom: "50px",
              right: "50px",
              borderRadius: "50%",
              width: "55px",
              height: "55px",
            }}
            onClick={scrollUp}
          >
            <Box
              component="img"
              src={footprint}
              alt="footprint"
              sx={{ width: 40, height: 40 }}
            />
          </IconButton>
        </Tooltip>
      )}
    </div>
  );
}

export default BackToTop;
