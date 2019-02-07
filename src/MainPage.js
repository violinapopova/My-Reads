import React, {Component} from 'react';
import SelectedBook from './SelectedBook';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

class MainPage extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        selectOptions: PropTypes.func.isRequired
    }

    render() {
        let {books, selectOptions} = this.props;

        return (
            <div className="list-books">

                <div className="list-books-title">
                    <h1>My Reads</h1>
                </div>

                <div className="bookshelf">
                    <h2 className="bookshelf-title">Currently Reading</h2>
                    <div className="bookshelf-books">
                        <ol className="books-grid">
                        {books.filter((book) => book.shelf === 'currentlyReading')
                            .map((book) => (<li key={book.id}>
                                <SelectedBook
                                cover = {book.imageLinks}
                                title = {book.title}
                                authors = {book.authors}
                                shelf = {book.shelf}
                                book = {book}
                                selectOptions = {selectOptions}
                                />
                            </li>))
                        }
                        </ol>
                    </div>
                </div>
                
                <div className="bookshelf">
                    <h2 className="bookshelf-title">Want to Read</h2>
                    <div className="bookshelf-books">
                        <ol className="books-grid">
                        {books.filter((book) => book.shelf === 'wantToRead')
                            .map((book) => (<li key={book.id}>
                                <SelectedBook
                                cover = {book.imageLinks}
                                title = {book.title}
                                authors = {book.authors}
                                shelf = {book.shelf}
                                book = {book}
                                selectOptions = {selectOptions}
                                />
                            </li>))
                        }
                        </ol>
                    </div>
                </div>
                
                <div className="bookshelf">
                        <h2 className="bookshelf-title">Read</h2>
                        <div className="bookshelf-books">
                            <ol className="books-grid">
                                {books.filter((book) => book.shelf === 'read')
                                .map((book) => (<li key={book.id}>
                                <SelectedBook
                                cover = {book.imageLinks}
                                title = {book.title}
                                authors = {book.authors}
                                shelf = {book.shelf}
                                book = {book}
                                selectOptions = {selectOptions}
                                />
                                </li>))
                            }
                            </ol>
                        </div>
                </div>

                <div className="open-search">
                    <Link to='search'></Link>
                </div>

            </div>
        )
    }
}

export default MainPage;
