import React, { Component } from 'react';
import Book from './Book';
import PropTypes from 'prop-types';

class ListBooks extends Component {
    static propTypes = {
        books : PropTypes.array.isRequired,
        updateBook : PropTypes.func.isRequired,
        isSearchList : PropTypes.bool.isRequired,
    };
    sFunc = 'ListBooks';

    render() {
        const sFunc = this.sFunc + '.ListBooks()-->';
        const debug = false;
        const { shelves, books, updateBook, isSearchList } = this.props;

        debug && console.log( sFunc + 'isSearchList', isSearchList );
        debug && console.log( sFunc + 'shelves', shelves );
        return (
            <div>
                <div className="list-books-content">
                    {!isSearchList ? (
                        shelves.filter( ( s ) => {
                            return ( s.isDisplayed );
                        } )
                               .map( ( shelf ) => (
                                   <div className="bookshelf" key={shelf.id}>
                                       <h2 className="bookshelf-title">{shelf.text}</h2>
                                       <div className="bookshelf-books">
                                           {books.length ? (
                                               <ol className="books-grid">
                                                   {books.filter( ( book ) => {
                                                       return ( ( book.shelf === shelf.apiID ) );
                                                   } ).map( ( book ) => (
                                                       <Book
                                                           key={book.id}
                                                           book={book}
                                                           updateBook={updateBook}
                                                       />
                                                   ) )
                                                   }
                                               </ol>
                                           ) : (
                                               <span>No books found</span>
                                           )}
                                       </div>
                                   </div>
                               ) )

                    ) : (
                        <div className="bookshelf" key='searchBookShelf'>
                            <div className="bookshelf-books">
                                {books.length ? (
                                    <ol className="books-grid">
                                        {books.map( ( book ) => (
                                            <Book
                                                key={book.id}
                                                book={book}
                                                updateBook={updateBook}
                                            />
                                        ) )
                                        }
                                    </ol>
                                ) : (
                                    <span>No books found</span>
                                )}
                            </div>
                        </div>
                    )

                    }
                </div>
            </div>
        );
    }
}

export default ListBooks;
