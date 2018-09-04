import React from 'react';
import { Media } from 'react-bootstrap';

export const Book = props => {
  return (
    <div className="book-item">
      <Media>
        <Media.Left>
          <img width={100} height={100} src={props.book.imageUrl} alt="book" />
        </Media.Left>
        <Media.Body>
          <Media.Heading>{props.book.title}</Media.Heading>
          <p>{props.book.author}</p>
          <p>{props.book.publishedYear}</p>
        </Media.Body>
        <Media.Right align="middle">
          
          <span className="d-flex">
            {
              renderStars(Math.floor(props.book.averageRating))
            }
          </span>
          
            
        </Media.Right>
      </Media>
    </div>
  )
} 

const renderStars = count => {
  const stars = [];
  for(let i = 0; i<count; i++) {
    stars.push(<i className="fa fa-star" />);
  }
  return stars;
}