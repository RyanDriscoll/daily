const db = require('APP/db')

  const Category = require('APP/db/models/category')
  const Product= require('APP/db/models/product')
  const Reservation = require('APP/db/models/reservation')
  const Review = require('APP/db/models/review')
  const User = require('APP/db/models/user')

async function newCreateSeeds() {
    const user1 = {
        firstName: "Spencer",
        lastName: "Goodwine",
        email: 'spencer@spence.com',
        password: '123',
        isAdmin: true
    }

    const user2 = {
        firstName: 'Ryan',
        lastName: "Driscoll",
        email: "ryan@ryan.com",
        password: "123",
        isAdmin: false
    }

    const product1 = {
        name: 'power drill',
        description: 'This is a drill description',
        address: '123 N Java Street',
        city: 'Chicago',
        state: 'IL',
        zip: '60007',
        price: 25,
        end_date: 2016 + '-' + Math.ceil(Math.random() * 100 / 12) + '-' + Math.ceil((Math.random()) * 100 / 4),
        img_url: 'http://lorempixel.com/400/200/'
    }

    const product2 = {
        name: 'car',
        description: 'This is a car description',
        address: '123 Tea Street',
        city: 'Chicago',
        state: 'IL',
        zip: '60007',
        price: 1467,
        end_date: 2016 + '-' + Math.ceil(Math.random() * 100 / 12) + '-' + Math.ceil((Math.random()) * 100 / 4),
        img_url: 'http://lorempixel.com/400/200/'
    }

    const reservation1 = {
        status: 'completed',
        date: 2016 + '-' + Math.ceil(Math.random() * 100 / 12) + '-' + Math.ceil((Math.random()) * 100 / 4),
        order: 1
    }
    const reservation2 = {
        status: 'completed',
        date: 2016 + '-' + Math.ceil(Math.random() * 100 / 12) + '-' + Math.ceil((Math.random()) * 100 / 4),
        order: 2
    }



  //

// function makeDumpArray(n) {
//   const dumpArray = [];
//   for(var i = 0; i < n; i++) {
//     dumpArray.push(callAllCreateFuncs());
//   }
//   return dumpArray;
// }

// Promise.all(makeDumpArray(1)
//   .map(createObjs => User.create({ ... })))


//   const callAllCreateFuncs = function(){
//
//     console.log ("IN CALL ALL CREATE FUNCS")
//
// for(var i = 0; i<100;i++){
//     let counter = i+1
//
//  User.create(user())
//     .then(function(user){
//       console.log("USER CREATED", user)
//       let reservationObj = reservation()
//       let categoryObj = category()
//       let productObj = product()
//
//       let reviewObj = renterReview()
//
//       reservationObj.user_id = counter
//       reservationObj.order = counter
//       reservationObj.product_id = counter
//       productObj.seller_id = counter
//       productObj.category_id= counter
//
//       reviewObj.reservation_id = counter
//
//       counter++
//
//
//         Product.create(productObj)
//         .then(()=>{
//         Reservation.create(reservationObj)        })
//         .then(()=>{
//         Category.create(categoryObj)
//         })
//         .then(()=>{
//         Review.create(sellerReviewObj)
//         })
//
//       })
//
//     })
//     .catch(function(err){
//       console.log(err)
//     })
//     }
//
//     }

user1 = {
firstName: "Spencer",
lastName: "Goodwine",
email: 'spencer@spence.com',
password: '123',
isAdmin: true
}

user2 = {
firstName: 'Ryan',
lastName: "Driscoll",
email: "ryan@ryan.com",
password: "123",
isAdmin: false
}

product1 = { name: 'power drill',
      description: 'This is a drill description',
      address: '123 N Java Street',
      city: 'Chicago',
      state: 'IL',
      zip: '60007',
      price: 25,
      end_date:     2016+'-'+Math.ceil(Math.random()*100/12)+'-'+Math.ceil((Math.random())*100/4),
      img_url: 'http://lorempixel.com/400/200/'
}

reservation1= {
status: 'completed',
          date: 2016+'-'+Math.ceil(Math.random()*100/12)+'-'+Math.ceil((Math.random())*100/4),
          order: 1
}



//Renter Review
    const review1 = {
        stars: 5,
        text: 'Great product'
    }


//Seller Review
    const review2 = {
        stars: 2,
        text: 'Terrible User'
    }

    const category1 = {
        name: 'Tools'
    }

    const category2 = {
        name: 'Cars'
    }

    const [u1, u2] = await Promise.all([
        User.create(user1),
        User.create(user2)
    ])

    const [c1, c2] = await Promise.all([
        Category.create(category1),
        Category.create(category2)
    ])

    const p1 = await Product.create(product1)
        p1.setSeller(u1);
        p1.setCategory(c1);

    const p2 = await Product.create(product2)
        p2.setSeller(u2);
        p2.setCategory(c2);

    const res1 = await Reservation.create(reservation1);
    res1.setProduct(p1);
    res1.setRenter(u2);
    res1.setSeller(u1);

    const res2 = await Reservation.create(reservation2);
    res2.setProduct(p2);
    res2.setRenter(u1);
    res2.setSeller(u2);

    const renterreview1 = await Review.create(review1);
    const sellerreview1 = await Review.create(review2);

    res1.setSellerReview(sellerreview1);
    res1.setRenterReview(renterreview1);
}


  db.didSync
    .then(() =>
    db.sync({force: true}))
    .then(newCreateSeeds)
    .then(users => console.log(`Seeded database OK`))
    .catch(error => console.error(error))

    module.exports = newCreateSeeds
