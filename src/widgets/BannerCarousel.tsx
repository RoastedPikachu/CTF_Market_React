import React, { useState } from 'react';

import Link from "next/link";

import { Carousel } from 'react-responsive-carousel';

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
            image: '/static/assets/images/tshirtBanner.svg',
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

    return (
        <>
            <Carousel>
                {categories.map((category:Category) => (
                    <p key={category.id} className={ category.isActive ? 'active' : '' }>{ category.title }</p>
                ))}
            </Carousel>

            <Carousel ariaLabel={'div'} interval={5000} autoPlay={true} infiniteLoop={true}>
                {banners.map((banner:Banner) => (
                    <>
                        <div className='banner' key={banner.id}>
                            <Link href={`/shopItems/${banner.title}`} className="bannerImgRoute">
                                <img src={banner.image} alt={banner.description}/>
                            </Link>
                        </div>
                    </>
                ))}
            </Carousel>
        </>
    );
};

export default BannerCarousel;