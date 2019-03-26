import React, {Component} from 'react';
import {Modal, Button, ModalBody, ModalHeader, Row, Label, Container} from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';



const required = (val) => val && val.length;
const minLength = (len) => (val) => (val) && (val.length >= len);
class CommentForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            isOpen: false
        }
        this.toggleClick = this.toggleClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleClick(){
        this.setState({
            isOpen: !this.state.isOpen
        })
    }
    
    handleSubmit = (values) =>{
        console.log('values: ' + JSON.stringify(values));
        this.toggleClick()
    }

    render(){
        return(
            <div>
                <Button onClick={this.toggleClick}>Comment Here</Button>
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
            </div>
        )
    }
}

export default CommentForm;