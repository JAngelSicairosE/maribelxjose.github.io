import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { SectionWrapper } from "../hoc";
import { wrap } from "@popmotion/popcorn"
import { fadeIn } from "../utils/motion";

import "../styles.scss"

import { IMAGES } from "../constants/index"

const sliderVariants = {
  incoming: direction => ({
    x: direction > 0 ? "100%" : "-100%",
    scale: 1.2,
    opacity: 0
  }),
  active: { x: 0, scale: 1, opacity: 1 },
  exit: direction => ({
    x: direction > 0 ? "-100%" : "100%",
    scale: 1,
    opacity: 0.2
  })
}

const sliderTransition = {
  duration: 1,
  ease: [0.56, 0.03, 0.12, 1.04]
}

const Carousel = () => {
  const [[imageCount, direction], setImageCount] = useState([0, 0])

  const activeImageIndex = wrap(0, IMAGES.length, imageCount)

  const swipeToImage = swipeDirection => {
    setImageCount([imageCount + swipeDirection, swipeDirection])
  }

  const dragEndHandler = dragInfo => {
    const draggedDistance = dragInfo.offset.x
    const swipeThreshold = 50
    if (draggedDistance > swipeThreshold) {
      swipeToImage(-1)
    } else if (draggedDistance < -swipeThreshold) {
      swipeToImage(1)
    }
  }

  const skipToImage = imageId => {
    let changeDirection
    if (imageId > activeImageIndex) {
      changeDirection = 1
    } else if (imageId < activeImageIndex) {
      changeDirection = -1
    }
    setImageCount([imageId, changeDirection])
  }

  return (
    <section className="relative bg-save items-center bg-cover bg-no-repeat bg-center p-[50px] ring-1 ring-black/5 pt-[50px] pb-[50px]">
      
      
      
      <div className="absolute inset-0 bg-black bg-opacity-5 backdrop-blur-[5px]"></div>
      <motion.div
        variants={fadeIn("", "", 0.1, 1)}
        className="relative "
      >
        <h2 className="font-save text-[72px] text-center drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] pt-10 pb-10">
          Galeria
        </h2>

        <div className="slider-container">
        <div className="slider">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={imageCount}
              style={{
                backgroundImage: `url(${IMAGES[activeImageIndex].imageSrc})`
              }}
              custom={direction}
              variants={sliderVariants}
              initial="incoming"
              animate="active"
              exit="exit"
              transition={sliderTransition}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(_, dragInfo) => dragEndHandler(dragInfo)}
              className="image"
            />
          </AnimatePresence>
        </div>

        <div className="buttons pt-5 pb-5">
          <button onClick={() => swipeToImage(-1)}>Anterior</button>
          <button onClick={() => swipeToImage(1)}>Siguiente</button>
        </div>
      </div>

      <div className="thumbnails">
        {IMAGES.map(image => (
          <div
            key={image.id}
            onClick={() => skipToImage(image.id)}
            className="thumbnail-container"
          >
            <img src={image.imageSrc} alt="{image.id}" />
            <div
              className={`active-indicator ${
                image.id === activeImageIndex ? "active" : null
              }`}
            />
          </div>
        ))}
      </div>
      </motion.div>

      
    </section>
  )
}

export default SectionWrapper(Carousel, "");
