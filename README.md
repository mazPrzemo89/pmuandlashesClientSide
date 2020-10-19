# pmuandlashesClientSide
This scheduling application was written for a professional beautician. It's highly personalised, as it gives the admin full flexibility in creating categories, services and setting up their own working schedule. The working schedule allows the admin to adjust their full availability, by selecting days of the week they want to work, hours, default for every day or custom for any given day if necessary. Holidays and breaks are also a feature included in this app.

# Components

## Admin Dashboard

After following the steps included in pmuandlashesServerSide README file you shoud have an admin account set.
Loging in as admin will show you more options in the menu. The menu button is located in the upper left corner.
Clicking on Dashboard will take you to the admin dashboard where you can create Categories, Products, Promotions and post certificates 
as well as remove them. When your categories and products are ready you can move to Time Sheet page.

## Time Sheet

On the time sheet page you will see a set button for each day of the week "ON" or "OFF" will be highlighted depending on what you choose.
Under that section you can Delete working times sheet or Create a new one. Default option in "Set working hours timesheet" will apply to every working day unless you create a custom one.

## Home page

Home page displays previously created categories as React Components by looping over components array fetched from the database via REST API.
Clicking on Browse treatments button will take you to Products page for the specified category.

## Products page

Products page is also generating a list of Products from an array fetched from the database. Components are populated with data such as title, image, description, price. Clicking on Book appointments will take you to the Calendar page where the bookig happens.

## Calendar page

