import React, { Component } from 'react';
import { g } from './App';
import * as BooksAPI from './BooksAPI';
import PropTypes from 'prop-types';

class Book extends Component {
    sFunc = 'Book';
    static propTypes = {
        book : PropTypes.object.isRequired,
        updateBook : PropTypes.func.isRequired,
    };

    moveBook = ( event ) => {
        const sFunc = this.sFunc + '.moveBook()-->';
        const debug = true;
        const { id } = this.props.book;
        const newShelf = event.target.value;

        event.preventDefault();

        debug && console.log( sFunc + 'newShelf', newShelf, 'id', id );

        BooksAPI.update( { id : id }, newShelf )
                .then( ( ret ) => {
                    const sFunc = this.sFunc + '.update()-->';

                    debug && console.log( sFunc + 'ret', ret );

                    this.props.updateBook( id, newShelf, this.props.book );

                    return true;
                } );

        return true;

    };

    render() {
        const sFunc = this.sFunc + '.render()-->';
        const debug = false;
        let { title, imageLinks, authors, shelf, id } = this.props.book;

        authors = authors || [];
        const imageLinks2 = imageLinks || { smallThumbnail : '' };
        const imageLink = imageLinks2.smallThumbnail || imageLinks2.thumbnail || '';

        shelf = shelf || g.shelves.filter( (s) => { return( s.id === 'NONE' ) })[0].apiID;
        debug && console.log( sFunc + 'id', id );

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
                                {g.shelves.map( ( s ) => (
                                    <option
                                        key={s.id}
                                        value={s.apiID}
                                    >{s.text}</option>
                                ) )}
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{title}</div>
                    <div className="book-authors">
                        {authors.map( ( a ) => ( <div key={a}>{a}</div> ) )}
                    </div>
                </div>
            </li>
        );
    }
}

//<div key={a}>{a}</div>

export default Book;
