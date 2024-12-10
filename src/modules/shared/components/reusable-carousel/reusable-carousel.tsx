import React, { PropsWithChildren } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LeftArrow from "../../assets/icons/arrow-left-sm.svg";
import RightArrow from "../../assets/icons/arrow-right-sm.svg";
import Image from "next/image";

interface ReusableCarouselProps extends PropsWithChildren<any> {
  dots?: boolean;
  infinite?: boolean;
  speed?: number;
  slidesToShow?: number;
  slidesToScroll?: number;
  arrows?: boolean;
  className?: string;
  rtl?: boolean;
  key?: string;
  sliderRef?: React.RefObject<Slider>;
  responsive?: {
    breakpoint: number;
    settings: ReusableCarouselProps | any;
  }[];
  disableSliderForFewItems?: boolean; // New prop to control slider behavior
  autoPlay?: boolean;
  autoplaySpeed?: number;
  beforeChange?: (oldIndex: number, newIndex: number) => void;
}

const CustomPrevArrow = (props: any) => (
  <div {...props} className="arrow right-arrow">
    <Image
      className="arrow-icon"
      src={RightArrow}
      alt=""
      width={100}
      height={100}
    />
  </div>
);

const CustomNextArrow = (props: any) => (
  <div {...props} className="arrow left-arrow">
    <Image
      className="arrow-icon"
      src={LeftArrow}
      alt=""
      width={100}
      height={100}
    />
  </div>
);

const ReusableCarousel: React.FC<ReusableCarouselProps> = ({
  arrows = true,
  dots = false,
  infinite = false,
  speed = 500,
  slidesToShow = 1,
  slidesToScroll = 1,
  className = "",
  children,
  sliderRef,
  responsive,
  disableSliderForFewItems = false, // Default to false
  autoplaySpeed,
  beforeChange,
}) => {
  const i18n = { language: "en" }; // useTranslation()

  const settings = {
    arrows,
    dots,
    infinite,
    speed,
    slidesToShow,
    slidesToScroll,
    className: `reusable-carousel carousel-${
      i18n.language === "ar" ? "ar" : "en"
    } ${className}`,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive,
    dir: "rtl",
    autoplay: true,
    pauseOnHover: false,
    autoplaySpeed: autoplaySpeed || 6000,
    beforeChange,
  };

  // Determine if the children should be rendered directly based on the prop and number of children
  const childrenArray = React.Children.toArray(children);
  const shouldRenderDirectly = disableSliderForFewItems;

  return shouldRenderDirectly ? (
    <div className={`reusable-carousel direct-render ${className}`}>
      {childrenArray.map((child, index) => (
        <div key={index} className="direct-render-item">
          {child}
        </div>
      ))}
    </div>
  ) : (
    <Slider ref={sliderRef} {...settings}>
      {children}
    </Slider>
  );
};

export default ReusableCarousel;
