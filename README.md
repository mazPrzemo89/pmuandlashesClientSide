# pmuandlashesClientSide
This scheduling application was written for a professional beautician. It's highly personalised, as it gives the admin full flexibility in creating categories, services and setting up their own working schedule. The working schedule allows the admin to adjust their full availability, by selecting days of the week they want to work, hours, default for every day or custom for any given day if necessary. Holidays and breaks are also a feature included in this app.
To create an admin account you have to signup via /signup route and then change role in your database manually form 0 to 1, it's described in the server side readme as well.

# Containers and Components

## Admin Dashboard

In admin dashboard you can create Categories, Products, Promotions and post certificates 
as well as remove them. When your categories and products are ready you can move to Timesheet page and adjust your timesheet.

## Timesheet

On the time sheet page you will see a set button for each day of the week "ON" or "OFF" will be highlighted depending on what you choose.
Under that section you can Delete working times sheet or Create a new one. Default option in "Set working hours timesheet" will apply to every working day unless you create a custom one.

## Home page

Home page displays previously created categories as React Components by looping over components array fetched from the database via REST API.
Clicking on Browse treatments button will take you to Products page for the specified category.

## Products page

Products page is also generating a list of Products from an array fetched from the database. Components are populated with data such as title, image, description, price. Clicking on Book appointments button will take you to the Calendar page where the booking happens.

## Calendar page

On the calendar page you are able to book your desired appointment from current date to three months ahead. You can choose from days and times previously set by the admin. To successfully book an appoinment you will have to pay deposit and provide a valid UK phone number to which a confirmation SMS message will be sent as well as a reminder one day before your appointment. Booked and overlapping  hours will not be displayed in the UI, however admin user will be able to see all the booking times, booked are displayed in red, breaks in green. Admin can also book appointments form the calendar page without a need to pay a deposit.

## Bookings page

Bookings page is only available to the admin. All the bookings will be displayed there as buttons with their corresponding date clicking on that button will display the actual bookings list with customer name, phone number, time, treatment and cancel button. Clicking on cancel button will trigger a confirmation prompt.

## About page

About page is purely representational the admin can write a few words about themselves and post their picture.

## Qualification page

Qualification page is intended to display cerfificates previously posted by the admin. Certificates can be posted from the Admin dashboard. 


# Deployment

Before creating a production build you will have to adjust the API's so the server can serve the files from build directory correctly.
You can find them in ``` src/APIs ``` and ``` src/auth ``` directories.
You will have to remove the appended ``` ${API} ``` variable form the path in every fetch call. See the example below. Or alternatively set the react env variable to empty string, after doing so you can omit the steps below.

### Development

```
export const signup = user => {

    return fetch(`${API}/signup`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            "Content-type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json()
        })
        .catch(err => {
            console.log(err)
        })
}

```

### Production

```

export const signup = user => {

    return fetch(`/signup`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            "Content-type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json()
        })
        .catch(err => {
            console.log(err)
        })
}

```
The API variable import is not needed in production build it sits at the top of every file containig API's

``` import { API } from '../config'  ``` 

You can delete in form the config file aswell.

Now you can run ``` npm run build ``` command.
Place the newly created build folder in the servers root directory.


