import React, {Component} from 'react';
import {Modal, Button, ModalBody, ModalHeader, Row, Label, Container} from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';



const required = (val) => val && val.length;
const minLength = (len) => (val) => (val) && (val.length >= len);
class CommentForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            isOpen: false,
            isOpenDelete: false,
            comments: this.props.comments
        }
        this.toggleClick = this.toggleClick.bind(this);
        this.toggleClickDelete = this.toggleClickDelete.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    toggleClick(){
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    toggleClickDelete(){
        this.setState({
            isOpenDelete: !this.state.isOpenDelete
        })
    }
    
    handleSubmit = (values) =>{
        this.props.updateCommentData(this.state.comments.id, values.name, values.comment)
        this.toggleClick()
        
    }

    handleDelete = () =>{
        const id = this.state.comments.id;
        this.props.deleteComment(id);
        this.toggleClickDelete()
    }
    
    render(){
        return(
            <div>
                <Button className="btn-style" color="success" onClick={this.toggleClick}>Edit Comment</Button>
                <Button className="btn-style" color="danger" onClick={this.toggleClickDelete}>Delete</Button>   
                <Modal isOpen={this.state.isOpen} toggle={this.toggleClick}>
                    <ModalHeader toggle={this.toggleClick}>Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => (this.handleSubmit(values))}>
                            <Container>
                                <Row className="form-group">
                                    <Label htmlFor="name">Name</Label>
                                    <Control.text model=".name" id="name" name="name"
                                        placeholder="Name ..."
                                        className="form-control"
                                        defaultValue={this.state.comments.name}
                                        validators={{
                                            required, minLength: minLength(3)
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model = ".name"
                                        show = "touched"
                                        messages={{
                                            required: "Required ",
                                            minLength: "Must be greater that 2 characters"
                                        }}
                                    ></Errors>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="comment">Your Comment</Label>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        rows="6"
                                        className="form-control"
                                        defaultValue={this.state.comments.comment}
                                        validators={{
                                            required, minLength: minLength(3)
                                        }}/>
                                    <Errors
                                        className="text-danger"
                                        model = ".comment"
                                        show = "touched"
                                        messages={{
                                            required: "Required ",
                                            minLength: "Must be greater that 2 characters"
                                        }}
                                    ></Errors>
                                </Row>
                                <Button type="submit" value="submit" className="bg-primary">Submit</Button>
                            </Container>
                        </LocalForm>
                    </ModalBody>
                </Modal>
                <Modal isOpen={this.state.isOpenDelete} toggle={this.toggleClickDelete}>
                    <ModalHeader toggle={this.toggleClickDelete}>Delete</ModalHeader>
                    <ModalBody>
                        <p>Are you sure to remove?</p>
                        <Button className="btn-style" color="danger" onClick={this.handleDelete}>Yes</Button>
                        <Button className="btn-style" onClick={this.toggleClickDelete}>No</Button>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

export default CommentForm;