import React, { useState } from "react";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";

const baseUrl = import.meta.env.BASE_URL;
const allImages = [
  { src: `${baseUrl}images/Generale/PXL_20250405_195217346.jpg`, width: 1, height: 1 },
  { src: `${baseUrl}images/Generale/PXL_20250412_164521498.jpg`, width: 1, height: 1 },
  { src: `${baseUrl}images/Generale/PXL_20250426_185158011.jpg`, width: 1, height: 1 },
  { src: `${baseUrl}images/Generale/PXL_20250601_163148263.jpg`, width: 1, height: 1 },
  { src: `${baseUrl}images/Generale/PXL_20250914_100048260.PORTRAIT.jpg`, width: 1, height: 1 },
  { src: `${baseUrl}images/Generale/PXL_20250928_084839734.jpg`, width: 1, height: 1 },
  { src: `${baseUrl}images/Generale/PXL_20250928_090029265.jpg`, width: 1, height: 1 },
  { src: `${baseUrl}images/Generale/PXL_20251109_090820115.PORTRAIT.ORIGINAL.jpg`, width: 1, height: 1 },
  { src: `${baseUrl}images/Generale/PXL_20251109_112648076.PORTRAIT.jpg`, width: 1, height: 1 },
  { src: `${baseUrl}images/Generale/PXL_20251130_090459880.jpg`, width: 1, height: 1 }
];

function ModernGallery() {
  const DISPLAY_COUNT = 9;
  const [startIndex, setStartIndex] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  const [slide, setSlide] = useState(0); // -1: prev, 1: next, 0: static

  const displayImages = allImages.slice(startIndex, startIndex + DISPLAY_COUNT);

  const openLightbox = (event, { photo, index }) => {
    setCurrentImage(startIndex + index);
    setViewerIsOpen(true);
  };

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  const handleNext = () => {
    setSlide(1);
    setTimeout(() => {
      setStartIndex(prev => {
        const next = prev + DISPLAY_COUNT;
        return next >= allImages.length ? 0 : next;
      });
      setSlide(0);
    }, 400);
  };

  const handlePrev = () => {
    setSlide(-1);
    setTimeout(() => {
      setStartIndex(prev => {
        const next = prev - DISPLAY_COUNT;
        return next < 0 ? Math.max(0, allImages.length - DISPLAY_COUNT) : next;
      });
      setSlide(0);
    }, 400);
  };

  return (
    <section id="gallery" className="gallery">
      <div className="container">
        <h2 className="section-title">Galleria</h2>
        <p className="section-subtitle">Momenti della nostra vita comunitaria</p>
        <div className="gallery-controls-floating">
          <button className="gallery-arrow-float left" onClick={handlePrev} aria-label="Precedente">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>
          <button className="gallery-arrow-float right" onClick={handleNext} aria-label="Successivo">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 6 15 12 9 18"></polyline></svg>
          </button>
        </div>
        <div className={`gallery-slide-modern${slide === 1 ? ' slide-next' : slide === -1 ? ' slide-prev' : ''}`}>
          <Gallery photos={displayImages} onClick={openLightbox} direction="row" margin={8} />
        </div>
        <ModalGateway>
          {viewerIsOpen ? (
            <Modal onClose={closeLightbox}>
              <Carousel
                currentIndex={currentImage}
                views={allImages.map(x => ({ ...x, srcset: x.src, caption: "" }))}
              />
            </Modal>
          ) : null}
        </ModalGateway>
      </div>
    </section>
  );
}

export default ModernGallery;
