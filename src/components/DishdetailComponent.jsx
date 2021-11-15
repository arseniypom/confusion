import React, { Component } from 'react'
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

export default class DishDetail extends Component {

  renderDish() {
    return(
      <Card>
        <CardImg top src={this.props.dish.image} alt={this.props.dish.name} />
        <CardBody>
            <CardTitle>{this.props.dish.name}</CardTitle>
            <CardText>{this.props.dish.description}</CardText>
        </CardBody>
      </Card>
    );
  }

  renderComments(comments) {
    if (comments != null) {
      return (
        <div>
          <h4>Comments</h4>
          <ul className="list-unstyled">
            {
              comments.map((comment) => {
                return (
                  <li key={comment.id}>
                    <p>{comment.comment}</p>
                    <p>–– {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                  </li>
                )
              })
            }
          </ul>
        </div>
      )
    } else {
      return <div></div>
    }

  }

  render() {
    if (this.props.dish != null) {
      return (
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-5 m-1">
              {this.renderDish(this.props.dish)}
            </div>
            <div className="col-12 col-md-5 m-1">
            {this.renderComments(this.props.dish.comments)}
            </div>
          </div>
        </div>
      )
    } else {
      return(
        <div></div>
      );
    }
  }
}
