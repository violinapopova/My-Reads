import React, {Component} from 'react';
import  {Link} from 'react-router-dom';
import SelectedBook from './SelectedBook';
import PropTypes from 'prop-types';

class SearchingPage extends Component {
    static propTypes = {
        searchingBooks: PropTypes.array.isRequired
    }

    render() {
        let {searchedItem,
            inputText,
            selectOptions,
            searchingBooks,
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
                    {searchingBooks.map((searchingBook) => (
                       <li key = {searchingBook.id}>
                            <SelectedBook 
                                cover = {searchingBook.imageLinks}
                                title = {searchingBook.title}
                                authors = {searchingBook.authors}
                                book = {searchingBook}
                                shelf = {searchingBook.shelf}
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