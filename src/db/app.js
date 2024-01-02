const fs = require('fs');
const products = require('./products.json');
const users = require('./users.json');

let myUsers = [
    ...users.map((user)=>{
        return {
            id: user.id,
            image: user.image,
            firstName: user.firstName,
            lastName: user.lastName,
            gender: user.gender,
            birthDate: user.birthDate,
            phone: user.phone,
            email: user.email,
            password: user.password,
            address: {
                address: user.address.address,
                country: 'USA',
                city: user.address.city,
                state: user.address.state,
                postalCode: user.address.postalCode
            },
        }
    })
];
let mySellers = [
    ...users.map((user)=>{
        return {
            id: user.id,
            user_id: user.id,
            image: user.image,
            name: user.firstName + ' ' + user.lastName,
            rating:  Number((Math.random() * 10).toFixed(1)),
            speed: Number((Math.random() * 10).toFixed(1)),
            sales: Math.floor(Math.random() * 100000) + 1
        }
    })
];

let productColors = ['Red', 'Blue', 'Black', 'Gold', 'Silver'];
let myProducts = [
    ...products.map((product)=>{
        return {
            id: product.id,
            thumbnail: product.thumbnail,
            title: product.title,
            description: product.description,
            category: product.category,
            brand: product.brand,
            details: [
                {
                    title: "Weight",
                    info: Number((Math.random() * 10).toFixed(1))+" KG"
                },
                {
                    title: "Size",
                    info: Number((Math.random() * 10).toFixed(1))+2+" x "+Number((Math.random() * 10).toFixed(1))+2+" x "+Number((Math.random() * 10).toFixed(1))+2+" CM"
                },
                {
                    title: "Color",
                    info: productColors[Math.floor(Math.random() * productColors.length)]
                },

            ],
            images: product.images
        }
    })
];

let uniqueCategories = [...new Set([
    ...products.map((product)=>{
        return product.category
    })
])];

let myCategories = [
    ...uniqueCategories.map((category, id)=>{
        return {
            id: id,
            image: "",
            name: category,
            desc: ""
        }
    })
];

let uniqueBrands = [...new Set([
    ...products.map((product)=>{
        return product.brand
    })
])];

let myBrands = [
    ...uniqueBrands.map((brand, id)=>{
        return {
            id: id,
            image: "",
            name: brand,
            desc: ""
        }
    })
];

let myListedProducts = [];
let productCounter = 1;
mySellers.forEach((seller)=>{
    let numOfProducts = Math.floor(Math.random() * Math.floor(myProducts.length*0.1))
    while (numOfProducts > 0){
        myListedProducts.push({
            id: productCounter,
            seller_id: seller.id,
            product_id: myProducts[Math.floor(Math.random() * Math.floor(myProducts.length))].id,
            stock: Math.floor(Math.random() * 1000) + 1,
            price: Math.floor(Math.random() * 100000) + 1,
            speed: Number((Math.random() * 10).toFixed(1))
        })
        numOfProducts -= 1;
        productCounter += 1;
    }
})


const db = {
    users: myUsers,
    sellers: mySellers,
    products: myProducts,
    categories: myCategories,
    brands: myBrands,
    listed_products: myListedProducts,
}

fs.writeFile('./db.json', JSON.stringify(db, null, 2),{encoding:'utf8',flag:'w'}, function writeJSON(err) {
  if (err) return console.log(err);
  console.log('DONE !!');
});