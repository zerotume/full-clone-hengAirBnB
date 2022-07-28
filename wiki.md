# 2 MVP Features of Heng's CatBnB!

## What does the state look like

```json
{
  "session":{
    "user":{
      "id":1,
      "email":"meowone@cat.com",
      "username":"catuser1",
      "firstName":"Meowone",
      "lastName":"Cat",
      "createdAt":"2020-07-22T20:10:54.000Z",
      "updatedAt":"2020-07-22T20:10:54.000Z",
    }
  },
  "Spots": {
        "1":{
            "id": 1,
            "ownerId": 1,
            "address": "Rd Orange Cat 1",
            "city": "Cattown",
            "state": "CT",
            "country": "Nation of Cat",
            "lat": 11.1111111,
            "lng": 111.1111111,
            "name": "Cattown Vella",
            "description": "Best gathering place for cats in Cattown",
            "price": 111,
            "createdAt": "2020-07-22T20:10:54.000Z",
            "updatedAt": "2020-07-22T20:10:54.000Z",
            "previewImage": {
                "6":{
                    "id": 6,
                    "url": "https://backofthebrain.files.wordpress.com/2012/06/many-cats-in-the-room.jpg"
                },
                //...
            }
        },
        "currentSpot":{
                "Owner":
                    {
                        "firstName": "Meowone",
                        "id": 1,
                        "lastName": "Cat"
                    },
                "address": "Rd Orange Cat 2",
                "avgStarRating": 4,
                "city": "Cattown",
                "country": "Nation of Cat",
                "createdAt": "2022-07-27T19:35:35.000Z",
                "description": "Cattown Feast House has a lot of human serving can food everyday!",
                "id": 4,
                "images": [
                            "https://attach.setn.com/newsimages/2021/07/03/3214952-PH.jpg",
                            "https://www.indy100.com/media-library/image.jpg?id=28042782&width=1245&quality=85&coordinates=111%2C0%2C111%2C0&height=700"
                        ],
                "lat": 11.1111112,
                "lng": 111.1111112,
                "name": "Cattown Feast House",
                "numReviews": 1,
                "ownerId": 1,
                "price": 112,
                "state": "CT",
                "updatedAt": "2022-07-27T19:35:35.000Z"
        },
        //...
        "mySpots":{
                    "1":
                        {
                            "id": 1,
                            "ownerId": 1,
                            "address": "Rd Orange Cat 1",
                            "city": "Cattown",
                            "state": "CT",
                            "country": "Nation of Cat",
                            "lat": 11.1111111,
                            "lng": 111.1111111,
                            "name": "Cattown Vella",
                            "description": "Best gathering place for cats in Cattown",
                            "price": 111,
                            "createdAt": "2020-07-22T20:10:54.000Z",
                            "updatedAt": "2020-07-22T20:10:54.000Z",
                            "previewImage":
                                {
                                    "6":{
                                        "id": 6,
                                        "url": "https://backofthebrain.files.wordpress.com/2012/06/many-cats-in-the-room.jpg"
                                    },
                                },
                        },
                    //...
                "mySpotsArray":
                    [
                        //...
                    ]
        },
        "SpotsArray":[
            //...
        ]
    },
    "Bookings": {
        "myBookings":{
                "1":{
                "started":true,
                "id": 1,
                "startDate": "2021-01-02",
                "endDate": "2021-01-10",
                "spotId": 2,
                "userId": 1,
                "createdAt": "2020-07-22T20:10:54.000Z",
                "updatedAt": "2020-07-22T20:10:54.000Z",
                "Spot": {
                    "id": 2,
                },
            },
            //...
            "myBookingsArray":[
                //...
            ]
        },
        "spotBookings":{
                "1":{
                "started":true,
                "id": 1,
                "startDate": "2021-01-02",
                "endDate": "2021-01-10",
                "spotId": 2,
                "userId": 1,
                "createdAt": "2020-07-22T20:10:54.000Z",
                "updatedAt": "2020-07-22T20:10:54.000Z",
                "Spot": {
                    "id": 2,
                },
            },
            //...
            "spotBookingsArray":[
                //...
            ]
        },
    }
}
```

***

## User Authentication
### Sign Up:

  * User can sign up a new account.
  * User should provide its email, username, first name, last name, password to create a new account.
  * Confirm password must be same to password.

### Log in:
  * User can log in to its account.
  * User have to provide a valid creadential, it could be the email or the username.
  * Only logged in users can access certain features, like spot details, booking lists.

### Log out:
  * User can log out from its account.
  * If the user logged out at a page requires the authentication, the page will give an warning that "you are not logged in".

***

## Spot CRUD
### READ all spots:
  * User can see all spots on the spots page.
  * Clicking on a spot will lead the user to `READ one spot` page.
  * Clicking on "myspots" will lead the user to `READ my spots` page.

### READ one spot
  * User can see the detailed information of one spot.
  * Clicking on the book button will lead the user to  `CREATE a booking` page.
  * Clicking on the edit button (shown when the user is the owner) will lead the user to `UPDATE a spot` feature.
  * Clicking on the delete button (shown when the user is the owner) will lead the user to `DELETE a spot` feature.

### READ my spots:
  * User can see the spots whose owner is the logged-in user.
  * Clicking on one delete button will lead the user to `DELETE a spot` feature.
  * Clicking on one edit button will lead the user to `UPDATE a spot` feature.

### CREATE a spot:
  * User can create a spot and then its owner will be the logged-in user.
  * User must fill out a form and pass all validations.

### UPDATE a spot:
  * User can update the information of an owned spot.
  * The current information will be placeholders in the form inputs.
  * User must fill out the form and pass all validations.

### DELETE a spot:
  * User can delete any of owned spots.
  * A successful message will be returned and leads the user to the spots page.

***

## Booking CRUD

### READ all the current user's bookings
  * User can see all the user's current bookings.
  * Bookings will also show some information about the spot.
  * Clicking on an edit button will lead the user to `UPDATE a booking` feature.
  * Clicking on a delete button will lead the user to `DELETE a booking` feature.
  * If the booking is in already started, the edit and delete buttons should be disabled.

### READ all bookings of a spot
  * User can see all the bookings for one spot.
  * If the user is the spot owner, more detailed information will be shown for the booking, including the user who booked it.
  * If the user is not the spot owner, it will only see the booking dates (start & end).

### CREATE a booking
  * User can create a booking for a (not owned) spot.
  * User must submit start date and end date for the booking.

### UPDATE a booking
  * User can edit a not-started booking for a spot.
  * The start date and the end date will be placeholders for the form.
  * User must submit start date and end date for the booking.

### DELETE a booking
  * User can cancel a not-started booking.
  * A successful message will be returned and leads the user to the mybooking page.
