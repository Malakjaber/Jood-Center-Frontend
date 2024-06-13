import ImageGallery from "react-image-gallery";

export default function HeroImagesGallary() {
  const images = [
    { original: "/assets/homeCarouselImages/image1.png" },
    { original: "/assets/homeCarouselImages/image2.png" },
    { original: "/assets/homeCarouselImages/image3.png" },
    { original: "/assets/homeCarouselImages/image4.png" },
  ];
  return (
    <div className="mt-[385px] h-fit w-[940px] mr-auto border-[20px] border-primary">
      <ImageGallery
        autoPlay={true}
        showNav={false}
        slideInterval={2000}
        showPlayButton={false}
        showThumbnails={false}
        showFullscreenButton={false}
        items={images}
      />
    </div>
  );
}
