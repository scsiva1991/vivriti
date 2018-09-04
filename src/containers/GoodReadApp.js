import React, { Component } from 'react';
import { Grid, Row, Col, Button, Form, FormGroup, FormControl } from 'react-bootstrap';
import { SearchBar } from '../components/SearchBar';
import { Book } from '../components/Book';
import { Pagination } from '../components/Pagination';
import { API } from '../api';

export default class GoodReadApp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      books: [],
      searchTerm: '',
      totalBooks: 0,
      currentPage: 1,
      maxPage: 1
    }
  }

//   componentDidMount = () => {
//     const proxyurl = "https://cors-anywhere.herokuapp.com/";
// const url = "https://www.goodreads.com/author/list/18541?format=xml&key=RoUsc2ix8ecPjulYJvPeg"; //
//     API.get(proxyurl+url).then(res => {
//       let responseDoc = new DOMParser().parseFromString(res.data, 'application/xml');
//       console.log(responseDoc);
//       console.log(responseDoc.getElementsByTagName('books'));
//     })
//   }

  handleChange = e => {
    this.setState({
      searchTerm: e.target.value
    });
  }

  clearSearch = () => {
    this.setState({
      searchTerm: '',
      books: []
    });
  }

  nextPage = () => {
    const { currentPage, totalBooks } = this.state;
    if (currentPage < (Math.ceil(totalBooks / 20))) {
      this.setState({ currentPage: currentPage + 1, books: [] }, () => this.searchBook());
    }
  }

  prevPage = () => {
    const { currentPage } = this.state;
    if (currentPage > 1) {
      this.setState({ currentPage: currentPage - 1, books: [] }, () => this.searchBook());
    }
  }

  redirectToFirstPage = () => {
    this.setState({ currentPage: 1 }, () => this.searchBook());
  }

  redirectToLastPage = () => {
    const { totalBooks } = this.state;
    const lastPage = Math.ceil(totalBooks / 20);
    this.setState({ currentPage: lastPage }, () => this.searchBook());
  }

  searchBook = () => {
    const { searchTerm, currentPage } = this.state;
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = 'https://www.goodreads.com/search/index.xml?key=RoUsc2ix8ecPjulYJvPeg';
    const bookUrl = `${proxyurl}${url}&q=${searchTerm}&page=${currentPage}`;
    API.get(bookUrl).then(res => {
      let responseDoc = new DOMParser().parseFromString(res.data, 'application/xml');
      const books = [];
      const start = responseDoc.getElementsByTagName('results-start')[0].textContent;
      const end = responseDoc.getElementsByTagName('results-end')[0].textContent;
      const totalBooks = responseDoc.getElementsByTagName('total-results')[0].textContent;

      for(let i = 0; i<end-start; i++) {
        let book = {};
        book.id = responseDoc.getElementsByTagName('work')[i].children[0].textContent;
        book.publishedYear = responseDoc.getElementsByTagName('work')[i].children[4].textContent;
        book.averageRating = responseDoc.getElementsByTagName('work')[i].children[7].textContent;
        book.title = responseDoc.getElementsByTagName('work')[i].children[8].children[1].textContent;
        book.author = responseDoc.getElementsByTagName('work')[i].children[8].children[2].children[1].textContent;
        book.imageUrl = responseDoc.getElementsByTagName('work')[i].children[8].children[3].textContent;
        books.push(book);
      }
      console.log('>> books >>', books);
      this.setState({
        books,
        totalBooks
      })
    });
  }

  render() {
    const { searchTerm, books, totalBooks, currentPage } = this.state;
    return (
      <Grid>
        <Row>
          <Col xs={12}>
            <SearchBar 
              searchTerm={searchTerm}
              handleChange={this.handleChange}
              searchBook={this.searchBook}
              clearSearch={this.clearSearch}
            />
          </Col>
        </Row>
        <Row className="mg-t-20">
          {
            totalBooks > 20 &&
            <Pagination
              totalBooks={totalBooks}
              currentPage={currentPage}
            />
          }
          {
            books.map(book => {              
              return (
                <Col xs={12}>
                  <Book key={book.id} book={book} />
                </Col>
              )
            })
          }
        </Row>
        
      </Grid>
    )
  }
}