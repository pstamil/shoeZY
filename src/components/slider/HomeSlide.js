import React from "react";
import { Box } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import shoe from "./homeSlides/shoe.jpg";
import shoe1 from "./homeSlides/shoe1.jpg";
import shoe2 from "./homeSlides/shoe2.jpg";
import shoe3 from "./homeSlides/shoe3.jpg";
import shoe4 from "./homeSlides/shoe4.jpg";
import shoe5 from "./homeSlides/shoe5.jpg";
import shoe6 from "./homeSlides/shoe6.jpg";
import shoe7 from "./homeSlides/shoe7.jpg";
import shoe8 from "./homeSlides/shoe8.jpg";

const images = [
  { url: `${shoe}` },
  { url: `${shoe1}` },
  { url: `${shoe2}` },
  { url: `${shoe3}` },
  { url: `${shoe4}` },
  { url: `${shoe5}` },
  { url: `${shoe6}` },
  { url: `${shoe7}` },
  { url: `${shoe8}` },
];

function HomeSlide() {
  return (
    <Box>
      <Carousel
        showArrows={false}
        showStatus={false}
        showThumbs={false}
        infiniteLoop={true}
        autoPlay={true}
        interval={5000}
        transitionTime={1000}
        width="100%"
        dynamicHeight={false}
        useKeyboardArrows={true}
      >
        {images.map((image, index) => (
          <div key={index}>
            <Box
              sx={{
                height: { xs: "60vh", sm: "60vh", md: "70vh", lg: "100vh" },
                width: "100%",
                backgroundImage: `url(${image.url})`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            />
          </div>
        ))}
      </Carousel>
    </Box>
  );
}

export default HomeSlide;
