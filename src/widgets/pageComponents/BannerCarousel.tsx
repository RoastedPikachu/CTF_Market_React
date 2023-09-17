import React, { useState, useEffect, useRef } from 'react';

import Link from "next/link";

import Carousel from 'react-responsive-carousel';

import "react-responsive-carousel/lib/styles/carousel.min.css";

import './bannerCarousel.scss';

interface Category {
    id: number,
    title: string,
    isActive: boolean
}

interface Banner {
    id: number,
    rusTitle: string,
    title: string,
    isActive: boolean,
    description: string,
    image: string,
    nodeRef: React.RefObject<HTMLInputElement>
}

const BannerCarousel = () => {
    let [banners, setBanners] = useState([
        {
            id: 1,
            rusTitle: 'Кружки',
            title: 'mugs',
            isActive: true,
            description: 'Баннер кружек',
            image: '/static/assets/images/mugBanner.svg',
        },
        {
            id: 2,
            rusTitle: 'Футболки',
            title: 't-shirts',
            isActive: false,
            description: 'Баннер футболок',
            image: '/static/assets/images/tshirtBanner.png',
        },
        {
            id: 3,
            rusTitle: 'Толстовки',
            title: 'sweatshirts',
            isActive: false,
            description: 'Баннер толстовок',
            image: '/static/assets/images/sweatshirtBanner.svg',
        },
        {
            id: 4,
            rusTitle: 'Книги',
            title: 'books',
            isActive: false,
            description: 'Баннер книжек',
            image: '/static/assets/images/bookBanner.svg',
        },
    ] as Banner[]);

    // const setBanner = (category:Category) => {
    //     if(!isPause) {
    //         clearInterval(bannerInterval);
    //
    //         banners.forEach(item => {
    //             if(item.isActive) {
    //                 setIsNext(item.id < category.id);
    //                 setIsPrevious(item.id > category.id);
    //
    //                 setTimeout(() => {
    //                     setIsNext(true);
    //                     setIsPrevious(false);
    //                 }, 1500);
    //             }
    //
    //             if(item.rusTitle != category.title) {
    //                 item.isActive = false;
    //             } else {
    //                 item.isActive = true;
    //             }
    //         });
    //         categories.forEach(item => item.isActive = false);
    //
    //         targetId = category.id - 1;
    //
    //         category.isActive = true;
    //         setIsPause(true);
    //
    //         bannerInterval = setInterval(() => getNextPhoto(), 5000);
    //         clearInterval(bannerInterval);
    //
    //         setTimeout(() => setIsPause(false), 1500);
    //     }
    // }

    // function getNextPhoto() {
    //     categories[targetId].isActive = false;
    //     banners[targetId].isActive = false;
    //
    //     setCategories([...categories]);
    //     setBanners([...banners]);
    //
    //     if(targetId >= 3) {
    //         targetId = 0;
    //     } else if(targetId < 3) {
    //         targetId++;
    //     }
    //
    //     categories[targetId].isActive = true;
    //     banners[targetId].isActive = true;
    //
    //     setCategories([...categories]);
    //     setBanners([...banners]);
    // }

    // bannerInterval = setInterval(() => getNextPhoto(), 5000);
    // return () => clearInterval(bannerInterval);
    let carouselRef = useRef(null);

    let [categories, setCategories] = useState([
        {
            id: 1,
            title: 'Кружки',
            isActive: true
        },
        {
            id: 2,
            title: 'Футболки',
            isActive: false
        },
        {
            id: 3,
            title: 'Толстовки',
            isActive: false
        },
        {
            id: 4,
            title: 'Книги',
            isActive: false
        }
    ] as Category[]);

    let [targetId, setTargetId] = useState(0);

    let bannerInterval:ReturnType<typeof setInterval>;

    const setCategory = (category:Category) => {
        categories.forEach((item:Category) => item.isActive = false);

        setTargetId(category.id - 1);
    }

    useEffect(() => {
        console.log(`targetId: ${targetId}`);
        categories[targetId].isActive = true;
        setCategories([...categories]);
    }, [targetId]);

    const changeCategory = () => {
        categories.forEach((item:Category) => item.isActive = false);

        if(targetId >= 3) {
            setTargetId(targetId = 0);
        } else if(targetId < 3) {
            setTargetId(targetId += 1);
        }
    }

    useEffect(() => {
        bannerInterval = setInterval(() => changeCategory(), 5000);

        return () => {
          clearInterval(bannerInterval);
        };
    }, []);

    return (
        <>
            <div id="Categories">
                {categories.map((category:Category) => (
                    <p key={category.id} onClick={() => setCategory(category)} className={ category.isActive ? 'active' : '' }>{ category.title }</p>
                ))}
            </div>

            {/*<div id='BannerWrapper'>*/}
            {/*    <Carousel*/}
            {/*        responsive={responsive}*/}
            {/*        arrows={false}*/}
            {/*        infinite={true}*/}
            {/*        autoPlay={true}*/}
            {/*        autoPlaySpeed={5000}*/}
            {/*        transitionDuration={1200}*/}
            {/*        ref={(el) => (this.Carousel = el)}*/}
            {/*    >*/}
            {/*        {banners.map((banner:Banner) => (*/}
            {/*            <Link href={`/shopItems/${banner.title}`} key={banner.id}>*/}
            {/*                <img src={banner.image} alt={banner.description} className='bannerImgRoute'/>*/}
            {/*            </Link>*/}
            {/*        ))}*/}
            {/*    </Carousel>*/}
            {/*</div>*/}
        </>
    );
};

export default BannerCarousel;