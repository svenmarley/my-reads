import React, { Component } from 'react';
import { globals } from '../App';
import * as BooksAPI from '../utils/BooksAPI';
import PropTypes from 'prop-types';
import anylogger from 'anylogger';

// I considered using a functional component, but IMHO it
//   1) makes the code less obvious that this is a component
//   2) loses the propTypes ability for setting props as isRequired

class Book extends Component {
    sFunc = this.constructor.name;
    static propTypes = {
        book : PropTypes.object.isRequired,
        updateBook : PropTypes.func.isRequired,
    };

    moveBook = ( event ) => {
        const sFunc = this.sFunc + ':moveBook';
        const log = anylogger( sFunc.toLowerCase() );
        const { id } = this.props.book;
        const newShelf = event.target.value;

        event.preventDefault();

        log.debug( 'newShelf', newShelf, 'id', id );

        BooksAPI.update( { id : id }, newShelf )
                .then( ( ret ) => {
                    const sFunc = '.update()-->';

                    log.debug( sFunc + 'ret', ret );

                    this.props.updateBook( id, newShelf, this.props.book );

                    return true;
                } );

        return true;

    };

    render() {
        const sFunc = this.sFunc + ':render';
        const log = anylogger( sFunc.toLowerCase() );
        let { title, imageLinks, authors, shelf, id } = this.props.book;

        authors = authors || [];
        const imageLinks2 = imageLinks || { smallThumbnail : '' };
        const imageLink = imageLinks2.smallThumbnail || imageLinks2.thumbnail || '';

        shelf = shelf || globals.shelves.filter( ( shelf) => { return( shelf.id === 'NONE' ) })[0].apiID;
        log.debug( 'id', id );

        return (
            <li key={id}>
                <div className="book" key={id}>
                    <div className="book-top">
                        <div className="book-cover" style={{
                            width : 128,
                            height : 193,
                            backgroundImage : 'url(' + imageLink + ')',
                        }}/>
                        <div className="book-shelf-changer">
                            <select value={shelf}
                                    onChange={this.moveBook}
                            >
                                <option key='move' value="move" disabled>Move to...</option>
                                {globals.shelves.map( ( shelf ) => (
                                    <option
                                        key={shelf.id}
                                        value={shelf.apiID}
                                    >{shelf.text}</option>
                                ) )}
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{title}</div>
                    <div className="book-authors">
                        {authors.map( ( author ) => ( <div key={author}>{author}</div> ) )}
                    </div>
                </div>
            </li>
        );
    }
}

export default Book;
