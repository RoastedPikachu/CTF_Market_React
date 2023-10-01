interface ShopItem {
    id: number,
    title: string,
    price: number,
    description: string,
    engCategory: string,
    category: string,
    images: string[]
}

interface Category {
    id: number,
    engTitle: string,
    title: string,
    isActive: boolean,
}

const filterShopItems = (shopItems:ShopItem[], initialShopItems:ShopItem[], categories:Category[], minPrice:number, maxPrice:number, category?:string) => {
    console.log('');
    initialShopItems = initialShopItems.map(shopItem => {
        switch(shopItem.category) {
            case 'Кружки':
                shopItem['engCategory'] = 'mugs';
                break;
            case 'Футболки':
                shopItem['engCategory'] = 't-shirts';
                break;
            case 'Толстовки':
                shopItem['engCategory'] = 'sweatshirts';
                break;
            case 'Книги':
                shopItem['engCategory'] = 'books';
                break;
        }
        return shopItem;
    });

    if(minPrice && maxPrice) {
        shopItems = initialShopItems;

        return shopItems.filter(shopItem => shopItem.price >= +minPrice && shopItem.price <= +maxPrice);
    } else if(maxPrice) {
        shopItems = initialShopItems;

        return shopItems.filter(shopItem => shopItem.price <= +maxPrice);
    } else if(minPrice) {
        shopItems = initialShopItems;

        return shopItems.filter(shopItem => shopItem.price >= +minPrice);
    }

    const targetCategories = [] as string[];

    if(category) {
        targetCategories.push(category);
    } else {
        categories.forEach(category => {
            if(category.isActive) {
                targetCategories.push(category.engTitle);
            }
        })
    }

    if(targetCategories.length) {
        return shopItems.filter(shopItem => targetCategories.includes(shopItem.engCategory));
    }
};

module.exports = filterShopItems;