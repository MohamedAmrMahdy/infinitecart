const fs = require('fs');
const products = require('./products.json');
const users = require('./users.json');
const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker');
const SALT_LENGTH = 10

function catToName(category) {
  return category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
}

let myUsers = [
  ...users.map((user) => {
    return {
      id: user.id,
      image: user.image,
      firstName: user.firstName,
      lastName: user.lastName,
      gender: user.gender,
      birthDate: user.birthDate,
      phone: user.phone,
      email: user.email,
      password: bcrypt.hashSync(user.password, SALT_LENGTH),
      address: {
        address: user.address.address,
        country: faker.location.country(),
        city: user.address.city,
        state: user.address.state,
        postalCode: user.address.postalCode
      },
    }
  })
];
let mySellers = [
  ...myUsers.map((user) => {
    return {
      id: user.id,
      user: user,
      image: faker.image.avatar(),
      name: faker.company.name().split(' ').slice(0,1).join(' '),
      rating: Number((Math.random() * 10).toFixed(1)),
      speed: Number((Math.random() * 10).toFixed(1)),
      sales: Math.floor(Math.random() * 100000) + 1
    }
  })
];

let uniqueCategories = [...new Set([
  ...products.map((product) => {
    return catToName(product.category);
  })
])];

let myCategories = [
  ...uniqueCategories.map((category, id) => {
    return {
      id: id,
      image: "",
      name: category,
      desc: ""
    }
  })
];

let uniqueBrands = [...new Set([
  ...products.map((product) => {
    return product.brand
  })
])];

let myBrands = [
  ...uniqueBrands.map((brand, id) => {
    return {
      id: id,
      image: "",
      name: brand,
      desc: ""
    }
  })
];

let productColors = ['Red', 'Blue', 'Black', 'Gold', 'Silver'];
let myMetaProducts = [
  ...products.map((product) => {
    return {
      id: product.id,
      thumbnail: product.thumbnail,
      title: product.title,
      description: product.description,
      category: myCategories.find((category) => category.name == catToName(product.category)),
      brand: myBrands.find((brand) => brand.name == product.brand),
      details: [
        {
          title: "Weight",
          info: Number((Math.random() * 10).toFixed(1)) + " KG"
        },
        {
          title: "Size",
          info: Number((Math.random() * 10).toFixed(1)) + 2 + " x " + Number((Math.random() * 10).toFixed(1)) + 2 + " x " + Number((Math.random() * 10).toFixed(1)) + 2 + " CM"
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


let myOrders = [];
let myReviews = [];
let myListedProducts = [];
let productCounter = 1;
mySellers.forEach((seller) => {
  let numOfProducts = Math.floor(Math.random() * Math.floor(myMetaProducts.length * 0.1))
  while (numOfProducts > 0) {
    let discount = 0;
    if (Math.random() > 0.5) {
      discount = Number(Math.random().toFixed(2));
    }

    myListedProducts.push({
      id: productCounter,
      seller: seller,
      product: myMetaProducts[Math.floor(Math.random() * Math.floor(myMetaProducts.length))],
      stock: Math.floor(Math.random() * 1000) + 1,
      price: Math.floor(Math.random() * 100000) + 1,
      rating: Number((Math.random() * 10).toFixed(1)),
      discount,
      reviews: []
    })

    let reviews = []
    let reviewsCount = Math.floor(Math.random() * 3) + 1
    while (reviewsCount > 0) {
      reviewsCount--;
      let user = myUsers[Math.floor(Math.random() * myUsers.length)]
      let review = {
        id: myReviews.length + 1,
        product_id: myListedProducts.length,
        user: user,
        review: faker.lorem.paragraph()
      }
      reviews.push(review)
      myReviews.push(review)
      myOrders.push({
        id: myOrders.length + 1,
        user: myUsers[Math.floor(Math.random() * myUsers.length)],
        timeline: {
          placed: Date.now(),
          inTransit: Date.now(),
          outForDelivery: Date.now(),
          delivered: Date.now(),
        },
        items: [
          {
            count: Math.floor(Math.random() * 3) + 1,
            item: myListedProducts[myListedProducts.length-1]
          }
        ]
      })
    }
    myListedProducts[myListedProducts.length-1].reviews = reviews
    numOfProducts -= 1;
    productCounter += 1;
  }
})

myOrders.map(order => {
  order.total = order.items.reduce((sum, x) => sum + (x.count * x.item.price), 0);
  return order
})

const db = {
  users: myUsers,
  sellers: mySellers,
  meta_products: myMetaProducts,
  categories: myCategories,
  brands: myBrands,
  products: myListedProducts,
  reviews: myReviews,
  orders: myOrders
}

fs.writeFile('./db.json', JSON.stringify(db, null, 2), { encoding: 'utf8', flag: 'w' }, function writeJSON(err) {
  if (err) return console.log(err);
  console.log('DONE !!');
});
