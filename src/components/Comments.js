import React, {Component} from 'react';
import {CardFooter, Row, Card, CardBody, CardTitle, CardText, Col} from 'reactstrap';
import CommentForm from './CommentForm';
import {Loading} from './LoadingComponent';
import {connect} from 'react-redux';
import {postComment, fetchComments, deleteComment, updateCommentData} from '../redux/ActionCreators';

const mapStateToProp = state =>{
    return {
      comments: state.comments
    }
}

const mapDispatchToProps = dispatch => ({
    postComment: (name, comment) => dispatch(postComment(name, comment)),
    fetchComments: () => dispatch(fetchComments()),
    deleteComment: (id) => dispatch(deleteComment(id)),
    updateCommentData: (id, name, comment) => dispatch(updateCommentData(id, name, comment))
});
  
function RenderComments({commentsData, deleteComment, updateCommentData}) {
    if (commentsData != null){
        const allComments = commentsData.map( (objCom) =>{
            return(
                <Card key={objCom.id}>
                    <CardBody>
                        <CardTitle>{objCom.name}</CardTitle>
                        <CardText>{objCom.comment}</CardText>
                        
                    </CardBody>
                    <CardFooter>
                        <Row>
                            <Col md={{size:4}}>
                                <CommentForm deleteComment={deleteComment} updateCommentData={updateCommentData} comments={objCom}></CommentForm>
                            </Col>
                        </Row>
                    </CardFooter>
                </Card>
            );
        })
        return(
            <div>
                <h4>Comments</h4>
                {allComments}
            </div>
        );
    }else{
        return(
            <div></div>
        );
    }
}

class Comments extends Component{
    constructor(props){
        super(props);
      }
    
    componentDidMount() {
        this.props.fetchComments();
    }

    render(){
        if(this.props.comments.isLoading){
            return (
                <div className="container">
                    <div className="row">
                        <Loading></Loading>
                    </div>
                </div>
            )
        }
        else if (this.props.comments.errMess){
            return (
                <div className="container">
                    <div className="row">
                        <h4>{this.props.errMess}</h4>
                    </div>
                </div>
            )
        }
        else if (this.props.comments != null){
            return (
                <div className="container">
                    <div className="row">
                        <Col md={{size:12}}>
                            <RenderComments commentsData={this.props.comments.comments} updateCommentData={this.props.updateCommentData} deleteComment={this.props.deleteComment}/>
                        </Col>
                    </div>
                </div>
            )
        }
    }
}

export default connect(mapStateToProp, mapDispatchToProps)(Comments);