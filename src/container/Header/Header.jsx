import React, { useState, useEffect } from "react";
import { easeInOut, motion, transform, useScroll } from "framer-motion";

import { AppWrap } from "../../wrapper";
import { images } from "../../constants";
import "./Header.scss";

const scaleVariants = {
  whileInView: {
    scale: [0, 1],
    opacity: [0, 1],
    transition: {
      duration: 1,
      ease: "easeInOut",
    },
  },
};

const Header = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({
        x: event.clientX,
        y: event.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="app__header app__flex">
      <motion.div
        whileInView={{ x: [-100, 0], opacity: [0, 1] }}
        transition={{ duration: 0.5 }}
        className="app__header-info"
      >
        <div className="app__header-badge">
          <div className="badge-cmp app__flex">

            <div className="prile-picture">
              <img src={images.profile} alt="profile_bg" />
            </div>
            <div style={{ marginLeft: 10, marginRight: 5 }}>
              <p className="p-text">Hello, I am</p>
              <h1 className="head-text">Stefano</h1>
            </div>
            <span>👋</span>
          </div>

          <div className="tag-cmp app__flex">
            <p className="p-text">Software Developer</p>
            <p className="p-text">Product designer</p>
            <p className="p-text">Freelancer</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        whileInView={{ opacity: [0, 1] }}
        transition={{ duration: 0.5, delayChildren: 0.5 }}
        className="app__header-img"
      >
        {/* <img src={images.logo} alt="profile_bg" />
        <motion.img
          whileInView={{ scale: [0, 1] }}
          transition={{ duration: 1, ease: easeInOut }}
          src={images.hexagon}
          alt="profile_circle"
          className="overlay_circle"
        /> */}
      </motion.div>

      <motion.div
        variants={scaleVariants}
        whileInView={scaleVariants.whileInView}
        className="app__header-circles"
      >
        {[images.figma, images.node, images.reactIcon].map((circle, index) => (
          <div
            className="circle-cmp app__flex"
            key={`circle-${index}`}
            style={{
              transform: `translate(${
                -(mousePosition.x - window.innerWidth / 2) / 30
              }px, ${(mousePosition.y - window.innerHeight / 2) / 30}px)`,
              boxShadow:
                "0 4px 6px rgba(0, 0, 0, 0.2), 0 1px 3px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.2s ease-out, box-shadow 0.2s ease-out",
            }}
          >
            <img src={circle} alt="circle" />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default AppWrap(Header, "home");
