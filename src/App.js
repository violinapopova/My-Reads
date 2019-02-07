import React from 'react';
import * as BooksAPI from './BooksAPI';
import MainPage from "./MainPage";
import SearchingPage from './SearchingPage';
import './App.css';
import escapeRegExp from 'escape-string-regexp';
import {Route} from 'react-router-dom';

class BooksApp extends React.Component {

  state = {
    books: [],
    query: '',
    searchingBooks:[],
    error: '',
  };

//when the App component has been rendered to the DOM a predefined set of seven books has been applied
componentDidMount(){
  BooksAPI.getAll().then((books) => {
    this.setState({books});
  });
};

updateOptions = (book, shelf) => {
    BooksAPI.update(book, shelf).then(()=>{
      book.shelf = shelf; 
      this.setState(prevState =>({
        books: prevState.books.filter((previousBook)=>previousBook.id!==book.id).concat([book]) //filter all books that have different id from previous state and add them to a new array. Then concatenate the filtered books with the updated books in a new array.
      }));
    });
  }


searchedItem = (query) => {
    this.setState({
      query: query
    });
  //if there is a text input the search() will be invoked
  if(query.length > 0){
  const match = new RegExp(escapeRegExp(query), 'i');
    BooksAPI.search(query).then((searchingBooks) => {

      this.setState({
        searchingBooks: searchingBooks.filter(
          (searchingBook) => match.test(searchingBook.authors)||match.test(searchingBook.title))

      })

      //compare the book's IDs and assign selected shelf if the book exist in  the collection 
      searchingBooks.forEach((searchingBook) => {

         this.state.books.forEach(book => {

          if(searchingBook.id === book.id){
            searchingBook.shelf = book.shelf;
              this.setState(prevState=>({
                searchingBooks: prevState.searchingBooks.filter((psearchingBook)=>psearchingBook.shelf!==searchingBook.shelf).concat([searchingBook])
              }))
          }
            return;
        })
        return;
      })
    })
    .catch(() => {
      setTimeout(() => {
        this.setState({
          searchingBooks: [],
          error: 'The book you are looking for doesn\'t exist in our collection, or you have a typo.'//not the best message :(
        })
      }, 500)
    })
  } else {
    //in case the input text has been deleted too fast the result searched by first letter remains or the error text will still be displayed
    setTimeout(()=>{
      this.setState({
        searchingBooks: [],
        error: ''
      })
      }, 1500);
  }
};


render() {
  let {books,
      query,
      searchingBooks,
      error} = this.state;

  return (
    <div className="app">

      <Route exact path='/'
        render= {() => (
          <MainPage
          books = {books}
          selectOptions = {this.updateOptions}
          />
        )}
      />

      <Route path = '/search'
        render = {() => (
          <SearchingPage
          inputText = {query}
          searchingBooks = {searchingBooks}
          searchedItem = {this.searchedItem}
          selectOptions = {this.updateOptions}
          error = {error}
          />
        )}
      />

    </div>
    );
  };
};

export default BooksApp;