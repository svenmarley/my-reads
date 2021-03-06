# MyReads Project

This is my version of the MyReads project as requested in my pursuit of a [Nanodegree](https://www.udacity.com/school-of-programming) in React from Udacity.

The requirement is to use a server created by the Udacity team to get lists of books, and track the books you have of interest - saving them different options/shelves back to the server.  The search is throttled using the [throttle-debounce](https://www.npmjs.com/package/throttle-debounce) package.

Note: This implementation uses [ulog](https://www.npmjs.com/package/ulog) for logging. 


## Installation

To get started right away:

* It is presumed the following are installed and working correctly:
  * [Node, npm](ttps://nodejs.org)
  * [Git](https://git-scm.com)

* Clone the project from here (https://github.com/svenmarley/my-reads.git)
   `/dev> git clone https://github.com/svenmarley/my-reads.git` - Will create a new my-reads directory in the /dev subdirectory
* Change to the new my-reads directory
* Install all project dependencies with `npm install`

## Usage
* Goto the projects subdirectory
* Start the development server with `npm start`
* Upon starting, the default browser will open, connecting to the npm server 

##Logging Notes: 
To change console logging levels, add a log= param to the URL.  Options include:
?log=[`error, warn, info, log, debug, trace, all, none`]

`localhost:3000/?log=all`

Logging defaults to `warn`.

* All logger names are lowercase for the matching of the log= environment variable.
 - i.e. if loggername = App:updateBook, and you want to turn on logging for it, but rest of app is left in _warn_, then the `log` entry looks like this:   `warn;app:updatebook=all`
 - see better descriptions in the [ulog](https://www.npmjs.com/package/ulog) documentation, in the **Configure** section



## What You're Getting
```bash
├── CONTRIBUTING.md
├── README.md - This file.
├── SEARCH_TERMS.md # The whitelisted short collection of available search terms for you to use with your app.
├── package.json # npm package manager file. It's unlikely that you'll need to modify this.
├── public
│   ├── favicon.ico # React Icon, You may change if you wish.
│   └── index.html # DO NOT MODIFY
└── src
    ├── App.css # Styles for your app. Feel free to customize this as you desire.
    ├── App.js # This is the root of your app. 
    ├── App.test.js # Used for testing. Provided with Create React App. Testing is encouraged, but not required.
    ├── BooksAPI.js # A JavaScript API for the provided Udacity backend. Instructions for the methods are below.
    ├── icons # Helpful images for your app. Use at your discretion.
    ├── ListBooks.js # A ListBooks component for listing the books, both on the main page, and the Search page
    ├── Search.js # A Search component that handles the search page 
    ├── Book.js # A Book component that handles an individual books display
    │   ├── add.svg
    │   ├── arrow-back.svg
    │   └── arrow-drop-down.svg
    ├── index.css # Global styles. You probably won't need to change anything here.
    └── index.js # You should not need to modify this file. It is used for DOM rendering only.
```

Remember that good React design practice is to create new JS files for each component and use import/require statements to include them where they are needed.

## Backend Server

To simplify your development process, we've provided a backend server for you to develop against. The provided file [`BooksAPI.js`](src/utils/BooksAPI.js) contains the methods you will need to perform necessary 
operations on the backend:

* [`getAll`](#getall)
* [`update`](#update)
* [`search`](#search)

### `getAll`

Method Signature:

```js
getAll()
```

* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* This collection represents the books currently in the bookshelves in your app.

### `update`

Method Signature:

```js
update(book, shelf)
```

* book: `<Object>` containing at minimum an `id` attribute
* shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]  
* Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search`

Method Signature:

```js
search(query)
```

* query: `<String>`
* Returns a Promise which resolves to a JSON object containing a collection of a maximum of 20 book objects.
* These books do not know which shelf they are on. They are raw results only. You'll need to make sure that books have the correct state while on the search page.

## Important
The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Contributing

