import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,
  CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody,
  Form, FormGroup, Input, Label, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);


class CommentForm extends Component {

  constructor(props) {
    super(props);

    this.toggleModal = this.toggleModal.bind(this);
    this.state = {
        isModalOpen: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  handleSubmit(values) {
    this.toggleModal()
    console.log('Current State is: ' + JSON.stringify(values));
    alert('Current State is: ' + JSON.stringify(values));
    // event.preventDefault();
  }

  render() {
    return (
      <>
        <a role="button" className="btn btn-outline-secondary" onClick={this.toggleModal}><i class="fa fa-pencil"></i> Submit Comment</a>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
            <ModalBody>
              <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                  <Row className="form-group">
                      <Label htmlFor="rating" md={12}>Rating</Label>
                      <Col md={12}>
                        <Control.select model=".rating" id="rating" defaultValue="1" className="form-control">
                          <option value="1" selected>1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </Control.select>
                      </Col>
                  </Row>
                  <Row className="form-group">
                      <Label htmlFor="author" md={12}>Your Name</Label>
                      <Col md={12}>
                          <Control.text model=".author" id="author" name="author"
                              placeholder="Your Name"
                              className="form-control"
                              validators={{
                                  required, minLength: minLength(3), maxLength: maxLength(15)
                              }}
                                />
                          <Errors
                              className="text-danger"
                              model=".author"
                              show="touched"
                              messages={{
                                  required: 'Required',
                                  minLength: 'Must be greater than 2 characters',
                                  maxLength: 'Must be 15 characters or less'
                              }}
                            />
                      </Col>
                  </Row>
                  <Row className="form-group">
                      <Label htmlFor="comment" md={12}>Comment</Label>
                      <Col md={12}>
                          <Control.textarea model=".comment" id="comment" name="comment"
                              rows="6"
                              className="form-control" />
                      </Col>
                  </Row>
                  <Row className="form-group">
                      <Col md={12}>
                          <Button type="submit" color="primary">
                          Submit
                          </Button>
                      </Col>
                  </Row>
              </LocalForm>
            </ModalBody>
        </Modal>
      </>
    )
  }
}

function RenderDish({dish}) {
  return(
    <Card>
      <CardImg top src={dish.image} alt={dish.name} />
      <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
      </CardBody>
    </Card>
  );
}

function RenderComments({comments}) {
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
        <CommentForm />
      </div>
    )
  } else {
    return <div></div>
  }
}

const  DishDetail = (props) => {
  if (props.dish != null) {
    return (
      <div className="container">
      <div className="row">
          <Breadcrumb>

              <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
              <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
              <h3>{props.dish.name}</h3>
              <hr />
          </div>                
      </div>
      <div className="row">
          <div className="col-12 col-md-5 m-1">
              <RenderDish dish={props.dish} />
          </div>
          <div className="col-12 col-md-5 m-1">
              <RenderComments comments={props.comments} />
          </div>
      </div>
      </div>
    );
  } else {
    return(
      <div></div>
    );
  }
}

export default DishDetail;