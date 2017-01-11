const db = require('APP/db')

  const Category = require('APP/db/models/category')
  const Product= require('APP/db/models/product')
  const RenterReview = require('APP/db/models/renterReview')
  const Reservation = require('APP/db/models/reservation')
  const SellerReview = require('APP/db/models/sellerReview')
  const User = require('APP/db/models/user')

  const firstnameArr = ['John', 'Zeke', 'Nick', 'Waseem', 'Rebecca', 'Ryan', 'Daniel', 'Claire', 'Alexis', 'Tom','Jean', 'Nicole', 'Kiara', 'Kristin', 'Diana', 'Tyler', 'Grant', 'Paxton', 'Alan', 'Patricia', 'Grace', 'Susan', 'Maxwell', 'Ulysses']
  const lastNameArr =[ 'Bowie', 'Cohen', 'John', 'Jagger', 'McCartney', 'Wonder', 'Cave', 'Reed', 'Waits', 'Gaye', 'Franklin', 'John', 'Clapton', 'Otis', 'Summers', 'Fitzgerald', 'Baker', 'Coltrane' ]

  const prodArr=['Household Goods', 'Power Tools', 'Lawn Care', 'Space Rental', 'Professional Time', 'Sporting Goods']

  const prodName=['power drill', 'push mower', '5 acre farm land', '1 parking space', 'vaccum cleaner', 'pressure washer', 'baby crib', 'skis', 'bicycle', 'Honda Accord', 'basement storage', 'electric guitar']


  const zipArr = [60007, 60018, 60068, 60106, 60131, 60176, 60601, 60602, 60603, 60604, 60605, 60606, 60607, 60608, 60609, 60610, 60611, 60612, 60613, 60614, 60615, 60616, 60617, 60618, 60619, 60620, 60621, 60622, 60623, 60624, 60625, 60626, 60628, 60629, 60630, 60631, 60632, 60633, 60634, 60636, 60637, 60638, 60639, 60640, 60641, 60642, 60643, 60644, 60645, 60646, 60647, 60649, 60651, 60652, 60653, 60654, 60655, 60656, 60657, 60659, 60660, 60661, 60706, 60707, 60714, 60804, 60827]

  const reviewArr = [1,2,3,4,5];

  const statusArr = ['carted', 'cancelled', 'completed']

  const reviewFunc = function(reviewNum){
    if(reviewNum === 1){
      return "TERRIBLE!!!!!"
    }
    if(reviewNum ===2){
      return "Not Great"
    }
    if(reviewNum === 3){
     return  'Average review here, nothing special...gets the job done'
    }
    if(reviewNum === 4){
     return  'Really good, great thing here'
    }
    if(reviewNum === 5){
      return "The best review ever, I love this thing, I want one of my own!!!!!"
    }
  }




//CATAGORY SEED FUNCTION
  const category = function(){

    return {
      name: prodArr[Math.floor(Math.random()*prodArr.length)],

    }
  }


  //RENTER REVIEW SEED FUNC
  const renterReview = function(){
    let reviewNum = reviewArr[Math.floor(Math.random()*reviewArr.length)]

    let text = reviewFunc(reviewNum)
    console.log("RENTER REVIEW NUM", reviewNum)

    return {
    stars: reviewNum,
    text:  text
    }
  }
 //SELLER REVIEW SEED FUNC
  const sellerReview = function(){
    let reviewNum = reviewArr[Math.floor(Math.random()*reviewArr.length)]

    let text = reviewFunc(reviewNum)
    console.log("SELLER REVIEW NUM", reviewNum)

    return {
    stars: reviewNum,
    text:  text
    }
  }




  const reservation = function(){

    return {

      status: statusArr[Math.floor(Math.random()*statusArr.length)],
      date: 2016+'-'+Math.ceil(Math.random()*100/12)+'-'+Math.ceil((Math.random())*100/4)

      }
  }

//USER SEED FUNCTION
  const user = function(){

    let isAdmin;

    if(Math.random()<.2){
      isAdmin = true
    }else{
      isAdmin = false
    }

    let firstName = firstnameArr[Math.floor(Math.random()*firstnameArr.length)]
    console.log("FIRSTNAME", firstName)
    let lastName = lastNameArr[Math.floor(Math.random()*lastNameArr.length)]
        console.log("LastName", lastName)
    let email = firstName+zipArr[Math.floor(Math.random()*zipArr.length)]+"@"+lastName+".com"

    return {
      firstName: firstName,
      lastName: lastName,
      email: '123@'+lastName+".com",
      password_digest: firstName,
      isAdmin: isAdmin
    }
  }


  const product = function(){


    const dollar = Math.floor(Math.random()*300)
    const cents = Math.floor(Math.random()*99)


    const price = dollar+"."+cents


    return {

      name: prodName[Math.floor(Math.random()*prodName.length)],
      description: " This is a product description",
      address: '123 N Java Street',
      city: "Chicago",
      state: 'IL',
      zip: zipArr[Math.floor(Math.random()*zipArr.length)],
      price: price,
      end_date:  2016+'-'+Math.ceil(Math.random()*100/12)+'-'+Math.ceil((Math.random())*100/4),
      img_url: 'http://lorempixel.com/400/200/'
    }
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


  const callAllCreateFuncs = function(){

    console.log ("IN CALL ALL CREATE FUNCS")

for(var i = 0; i<100;i++){
    let counter = i+1

 User.create(user())
    .then(function(user){
      console.log("USER CREATED", user)
      let reservationObj = reservation()
      let categoryObj = category()
      let productObj = product()
      let sellerReviewObj = sellerReview()
      let renterReviewObj = renterReview()

      reservationObj.user_id = counter
      reservationObj.order = counter
      reservationObj.product_id = counter
      productObj.seller_id = counter
      productObj.catagory_id= counter

      sellerReviewObj.reservation_id = counter
      renterReviewObj.reservation_id = counter

      counter++


        Product.create(productObj)
        .then(()=>{
        Reservation.create(reservationObj)        })
        .then(()=>{
        Category.create(categoryObj)
        })
        .then(()=>{

        SellerReview.create(sellerReviewObj)
        })
        .then(()=>{
        RenterReview.create(renterReviewObj)
      })

    })
    .catch(function(err){
      console.log(err)
    })
    }

    }



  db.didSync
    .then(() =>
    db.sync())
    .then(callAllCreateFuncs)
    .then(users => console.log(`Seeded database OK`))
    .catch(error => console.error(error))


    // const seedUsers = () => db.Promise.map([
    //   {name: 'so many', email: 'god@example.com', password: '1234'},
    //   {name: 'Barack Obama', email: 'barack@example.gov', password: '1234'},
    // ], user => db.model('users').create(user))

    module.exports = callAllCreateFuncs
