import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ListBooks from './ListBooks';
import * as BooksAPI from '../utils/BooksAPI';
import PropTypes from 'prop-types';

import { globals } from '../App';
import anylogger from 'anylogger';
import { throttle } from 'throttle-debounce';

class Search extends Component {
    sFunc = this.constructor.name; //'Search';
    state = {
        foundBooks : [],
        query : '',
    };
    static propTypes = {
        books : PropTypes.array.isRequired,
        updateBook : PropTypes.func.isRequired,
    };

    /**
     * Handle the changing query and send it to the API and change the list of books based on that return
     * @param event {event}
     */
    handleChange = ( event ) => {
        const sFunc = 'handleChange';
        const loggerName = ( this.sFunc + ':' + sFunc );
        const log = anylogger( loggerName );
        const value = event.target.value;

        //log.level = log.ALL;
        log.info( 'inside' );

        this.setState( () => ( {
            query : value,
        } ), () => {

            this.findBooks();
        } );
    };

    /**
     * Call the API with the current query, and update the state.foundBooks array
     */
    findBooks = () => {
        const sFunc = this.sFunc + ':findBooks';
        const log = anylogger( sFunc );

        //log.level = log.ALL;

        log.debug( 'query', this.state.query );


        throttleSearch(this);

    };

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link
                        className='close-search'
                        to={'/'}
                    />
                    <div className="search-books-input-wrapper">
                        {/*
                         NOTES: The search from BooksAPI is limited to a particular set of search terms.
                         You can find these search terms here:
                         https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                         However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                         you don't find a specific author or title. Every search is limited by search terms.
                         */}
                        <input type="text"
                               name="search_query_input"
                               value={this.state.query}
                               autoFocus
                               placeholder="Search by title or author"
                               onChange={this.handleChange}
                        />

                    </div>
                </div>
                <div className="search-books-results">
                    <ListBooks
                        books={this.state.foundBooks}
                        updateBook={this.props.updateBook}
                        isSearchList={true}
                    />
                </div>
            </div>
        );
    }
}


const throttleSearch = throttle( 700, false, (tThis) => {
    const sFunc = 'throttleSearch';
    const log = anylogger( sFunc );
    log.info( 'inside throttle' );
    //log.level = log.WARN;

    BooksAPI.search( tThis.state.query.trim() )
            .then( ( ret ) => {
                const sFunc = '.search()-->';
                const myBooks = tThis.props.books;

                log.debug( sFunc + 'ret', ret );
                log.debug( sFunc + 'props', tThis.props );

                ret = ret || [];        // handle in case no books are returned
                if ( typeof ( ret.error ) !== 'undefined' ) {   // handle if an error is returned
                    ret = [];
                }

                ret.map( ( searchedBook ) => {
                    log.debug( 'returnedBook.id', searchedBook.id );

                    const foundMyBookArray = myBooks.filter( ( currBook ) => {   // see if the new searched book is currently in our list
                        log.debug( 'currBook.id', currBook.id );
                        return ( currBook.id === searchedBook.id );
                    } );

                    log.debug( 'foundMyBookArray', foundMyBookArray );

                    if ( foundMyBookArray.length ) {    // set the searchedBook.shelf to the found books shelf
                        searchedBook.shelf = foundMyBookArray[0].shelf;
                    }
                    else {
                        searchedBook.shelf = globals.shelves.filter( ( shelf ) => {       // else, set it to NONE
                            return ( shelf.id === 'NONE' );
                        } ).apiID;
                    }
                    return true;
                } );

                log.debug( 'ret', ret );
                tThis.setState( () => {
                    return ( {
                        foundBooks : ret,
                    } );
                } );
            } );

});

export default Search;
