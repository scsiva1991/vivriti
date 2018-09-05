import React, { Component } from 'react';
import { Grid, Row, Col, Alert } from 'react-bootstrap';
import axios from 'axios';
import { URL } from '../constants';
import { SearchBar } from '../components/SearchBar';
import { Book } from '../components/Book';
import { Pagination } from '../components/Pagination';


export default class GoodReadApp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      books: [],
      searchTerm: '',
      totalBooks: 0,
      currentPage: 1,
      showAlert: false
    }
  }

  handleChange = e => {
    this.setState({
      searchTerm: e.target.value
    });
  }

  // To clear the search input
  clearSearch = () => {
    this.setState({
      searchTerm: '',
      books: [],
      totalBooks: 0,
      currentPage: 1,
      showAlert: false
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

  /**
   * Search books from good read API and if books are found
   * parse the xml and update to component state
   * 
   */
  searchBook = e => {
    if (e) {
      e.preventDefault();
    }
    const { searchTerm, currentPage } = this.state;
    const bookUrl = `${URL}&q=${searchTerm}&page=${currentPage}`;

    axios.get(bookUrl).then(res => {
      let responseDoc = new DOMParser().parseFromString(res.data, 'application/xml');
      const books = [];
      const start = responseDoc.getElementsByTagName('results-start')[0].textContent;
      const end = responseDoc.getElementsByTagName('results-end')[0].textContent;
      const totalBooks = responseDoc.getElementsByTagName('total-results')[0].textContent;
      const limit = end - start || 1;
      for(let i = 0; i<limit; i++) {
        let book = {};
        book.id = responseDoc.getElementsByTagName('work')[i].children[0].textContent;
        book.publishedYear = responseDoc.getElementsByTagName('work')[i].children[4].textContent;
        book.averageRating = responseDoc.getElementsByTagName('work')[i].children[7].textContent;
        book.title = responseDoc.getElementsByTagName('work')[i].children[8].children[1].textContent;
        book.author = responseDoc.getElementsByTagName('work')[i].children[8].children[2].children[1].textContent;
        book.imageUrl = responseDoc.getElementsByTagName('work')[i].children[8].children[3].textContent;
        books.push(book);
      }
      this.setState({
        books,
        totalBooks,
        showAlert: books.length > 0 ? false : true
      })
    });
  }

  render() {
    const { searchTerm, books, totalBooks, currentPage, showAlert } = this.state;
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
            showAlert &&
            <Alert bsStyle="danger" className="text-center">
              <strong>Sorry, No Books Found</strong>
            </Alert>
          }          
          <Col xs={6}>
            {
              totalBooks > 0 &&
              <h4 className="total-books"> {totalBooks} books found </h4>
            }
          </Col>
          <Col xs={6}>
            {
              totalBooks > 20 &&
              <Pagination
                totalBooks={totalBooks}
                currentPage={currentPage}
                nextPage={this.nextPage}
                prevPage={this.prevPage}
                redirectToFirstPage={this.redirectToFirstPage}
                redirectToLastPage={this.redirectToLastPage}
              />
            }
          </Col>
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