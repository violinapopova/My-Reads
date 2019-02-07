import React, {Component} from 'react';
import  {Link} from 'react-router-dom';
import SelectedBook from './SelectedBook';
import PropTypes from 'prop-types';

class SearchingPage extends Component {
    static propTypes = {
        searchBooks: PropTypes.array.isRequired
    }

    render() {
        let {searchedItem,
            inputText,
            selectOptions,
            searchBooks,
            error} = this.props;

        return(
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to='/'
                    className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input
                        type = "text"
                        placeholder = "Search a book by title or author"
                        value = {inputText}
                        onChange = {(event) => searchedItem(event.target.value)}
                        />
                    </div>
                </div>
                
                <div className="search-book-results">
                    <ol className="books-grid">
                    {searchBooks.map((searchBook) => (
                       <li key = {searchBook.id}>
                            <SelectedBook 
                                cover = {searchBook.imageLinks}
                                title = {searchBook.title}
                                authors = {searchBook.authors}
                                book = {searchBook}
                                shelf = {searchBook.shelf}
                                selectOptions = {selectOptions}
                            />
                       </li> 
                    ))}

                    {error}

                    </ol>
                </div>
            </div>
        )
    }
}
export default SearchingPage;
