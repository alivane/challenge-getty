import React, {Component} from 'react';
import { Button, Label, Col, Row, Container} from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const minLength = (len) => (val) => (val) && (val.length >= len);

class CommentAdd extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: "",
            comment: ""
        }
        this.handleAdd = this.handleAdd.bind(this);
    }
    handleAdd(values) {
        this.setState({name: "", comment: ""})
        this.props.postComment(values)
    }
    handleNameChange( e ) {
        this.setState( { name: e.target.value } );
    }
    handleCommetChange( e ) {
        this.setState( { comment: e.target.value } );
    }
    render(){
        return(
            <div className="container">
                <div className="row row-content">
                    <div className="col-12">
                        <h3>Add comments</h3>
                    </div>
                    <div className="col-12 col-md-9">
                        <LocalForm onSubmit={(values) => (this.handleAdd(values))}>
                            <Container>
                                <Row className="form-group">
                                    <Label htmlFor="name">Name</Label>
                                    <Control.text model=".name" id="name" name="name"
                                        placeholder="Name ..."
                                        className="form-control"
                                        value={this.state.name}
                                        onChange={ e => this.handleNameChange( e ) }
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
                                        value={this.state.comment}
                                        onChange={ e => this.handleCommetChange( e ) }
                                        validators={{
                                            required, minLength: minLength(3)
                                        }}/>
                                    <Errors
                                        className="text-danger"
                                        model = ".comment"
                                        show = "touched"
                                        defaultValue={this.state.comment}
                                        messages={{
                                            required: "Required ",
                                            minLength: "Must be greater that 2 characters"
                                        }}
                                    ></Errors>
                                </Row>
                                <Button type="submit" value="submit" className="bg-primary">Submit</Button>
                            </Container>
                        </LocalForm> 
                    </div>
                </div>
            </div>
        );
    }
}

export default CommentAdd;