import React from 'react';
import './assets/stylesheets/App.css';
import { Route } from 'react-router-dom';
import ListBooks from './components/ListBooks.js';
import * as BooksAPI from './utils/BooksAPI';
import Search from './components/Search.js';

// used a Global for "defines" so we don't hardcode things, and we can easily change text, apiID's, etc...
const globals = {
    shelves : [
        { id : 'CURR_READ', apiID : 'currentlyReading', text : 'Currently Reading', isDisplayed: true },
        { id : 'WANT_READ', apiID : 'wantToRead', text : 'Want to Read', isDisplayed: true },
        { id : 'ALREADY_READ', apiID : 'read', text : 'Already Read', isDisplayed: true },
        // added a new shelf to see that this implementation would support it, and it does, but the API server does not support a new shelf
        //{ id : 'MY_NEW_SHELF', apiID : 'myNewShelf', text : 'My New Shelf', isDisplayed: true },
        { id : 'NONE', apiID : 'none', text : 'None', isDisplayed: false },
    ],
};
export { globals };

class BooksApp extends React.Component {
    sFunc = 'BooksApp';

    state = {
        books : [],     // this is the list of "my" books that are in the shelves I have chosen
    };

    /**
     * Either adds a new book to the list, or changes the shelf of an existing book.
     *      (Changing shelf to NONE removes the book from the list)
     *
     * @param bookID {String}
     * @param newShelf {String}
     * @param newBook {Object}
     * @return {boolean}
     */
    updateBook = ( bookID, newShelf, newBook ) => {
        const sFunc = this.sFunc + '.updateBook()-->';  // sFunc is a reused variable for outputting debug code and knowing the place it came from
        const debug = false;                            // this allows us to turn on/off debug w/in a function easily

        debug && console.log( sFunc + 'bookID', bookID, 'newShelf', newShelf );

        debug && console.log( sFunc + 'oldBooks', this.state.books );
        let bFound = false;
        // walk the current list of books, and if we find a match, change it's shelf to the new shelf
        const newBooks = this.state.books.map( (book) => {
            if ( book.id === bookID ) {
                bFound = true;
                book.shelf = newShelf;
            }
            return( book )
        })
        // if no match was found, then this is coming from the Search and we need to add the book to our list
        if ( !bFound ) {
            newBook.shelf = newShelf;
            newBooks.push( newBook );
        }

        debug && console.log( sFunc + 'bFound', bFound, 'newBooks', newBooks );

        this.setState( () => ({
            books: newBooks
        }), () => {
            debug && console.log( sFunc + 'after setState  state', this.state );
        })

        return true;

    };

    /**
     * On load, we go get our the existing books from the API server
     */
    componentDidMount() {
        const sFunc = this.sFunc + '.componentDidMount()-->';
        const debug = false;

        // get all our current books from the API server
        BooksAPI.getAll()
                .then( ( myBooks ) => {

                    // prints out all the books we got
                    debug && myBooks.map( ( book ) => {
                        console.log( sFunc + 'book', book );
                        return true;
                    } );

                    this.setState( () => ( {
                        books : myBooks,
                    } ), () => {
                        debug && this.state.books.map( ( book ) => {
                            console.log( sFunc + 'book2', book.title, '-', book.shelf );
                            return true;
                        } );
                    } );
                } );
    }

    render() {
        return (
            <div className="app">
                <Route exact path='/search' render={() => (
                    <Search
                        books={this.state.books}
                        updateBook={this.updateBook}
                    />
                )}
                />

                <Route exact path='/' render={() => (
                    <div>
                        <ListBooks
                            updateBook={this.updateBook}
                            books={this.state.books}
                            shelves={globals.shelves}
                            isSearchList={false}
                        />
                </div> )}/>
            </div>
        );
    }
}

export default BooksApp;
