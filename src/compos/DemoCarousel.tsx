import { useEffect, useRef, useState } from "react";
import { Carousel } from "antd";
import type { CarouselRef } from "antd";

export default function DemoCarousel() {
    const carouselRef = useRef<CarouselRef>(null);
    const [currentSlide, setCurrentSlide] = useState(0);

    const items = ['one', 'two', 'three', 'four', 'five', 'six', 'seven'];
    const slidesToShow = 1;

    const maxSlideIndex = Math.max(0, items.length - slidesToShow);
    const dotCount = maxSlideIndex + 1;

    const onChange = (currSlide: number) => {
        setCurrentSlide(currSlide)
        console.log(currSlide, currentSlide, dotCount);
    };

    const contentStyle: React.CSSProperties = {
        margin: 0,
        height: '160px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
    };

    useEffect(() => {
        setCurrentSlide(1);
    }, [1, slidesToShow]);

    return (
        <div>
{/* 
            <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 4 }}>

                <Button isIconOnly size="sm" isDisabled={currentSlide === 0} onClick={() => carouselRef.current?.prev()}>
                    <ChevronLeft />
                </Button>


                <Button isIconOnly size="sm" isDisabled={currentSlide >= items.length - slidesToShow} onClick={() => carouselRef.current?.next()}>
                    <ChevronRight />
                </Button>
            </div> */}


            <Carousel
                initialSlide={0}
                ref={carouselRef}
                afterChange={onChange}
                dots={false}
                infinite={false}
                slidesToShow={slidesToShow}
                arrows={false}
            >
                {items.map((itm) => (
                    <div key={itm}>
                        <h3 style={contentStyle}>{itm}</h3>
                    </div>
                ))}
            </Carousel>


            {/* <div className="hidden md:flex">
                <ButtonGroup>
                    {Array.from({ length: dotCount }).map((_, pageIndex) => (
                        <Button
                            key={pageIndex}
                            size="sm"
                            variant={currentSlide === pageIndex ? "primary" : "secondary"}
                            onClick={() => carouselRef.current?.goTo(pageIndex)}
                        >
                            {pageIndex + 1}
                        </Button>
                    ))}
                </ButtonGroup>
            </div> */}



        </div>
    );
}
