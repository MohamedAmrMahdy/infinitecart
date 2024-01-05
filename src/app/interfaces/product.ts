export interface IProduct{
  "id": number,
  "seller": {
    "id": number,
    "user": {
      "id":number,
      "image": string,
      "firstName": string,
      "lastName": string,
      "gender": string,
      "birthDate": string,
      "phone": string,
      "email": string,
      "password": string,
      "address": {
        "address": string,
        "country": string,
        "city": string,
        "state":string,
        "postalCode": string
      }
    },
    "image": string,
    "name": string,
    "rating":number,
    "speed": number,
    "sales": number
  },
  product:{
    id: number,
    thumbnail: string
    title: string,
    description: string,
    images: string[]
      "category": {
        "id": number,
        "image": string,
        "name": string,
        "desc": string
      },
      brand: {
        "id":number,
        "image":string,
        "name": string,
        "desc":string
      },
      details: {title: string,info: string}[]
  },
  "stock": number,
  "price": number,
  "rating": string,
  "discount": number

}

