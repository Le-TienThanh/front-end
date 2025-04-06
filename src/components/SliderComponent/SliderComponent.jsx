
import React from "react";
import Slider from "react-slick";
import { Image } from "antd";
import { DatePicker } from 'antd'

const SliderComponent = ({arrImages}) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false
  };
  return (
    <Slider {...settings}>
      {arrImages.map((image) => {
        return (
        <Image key = {image} src={image} alt="slider" preview = {false} width = "100%" />
        )
      })}
    </Slider>
  );
};
export default SliderComponent;
