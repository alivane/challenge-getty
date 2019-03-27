import React from 'react';
import {CardFooter, Row, Card, CardBody, CardTitle, CardText, Col} from 'reactstrap';
import CommentForm from './CommentForm';

function RenderComments({commentsData}) {
    console.log(commentsData)
    if (commentsData != null){
        const allComments = commentsData.map( (objCom) =>{
            return(
                <Card key={objCom.id}>
                    <CardBody>
                        <CardTitle>{objCom.name}</CardTitle>
                        <CardText>{objCom.comments}</CardText>
                        
                    </CardBody>
                    <CardFooter>
                        <Row>
                            <Col md={{size:4}}>
                                <CommentForm></CommentForm>
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

const Comments = (props) => {
    return (
        <div className="container">
            <div className="row">
                <Col md={{size:12}}>
                    <img className="image-bg" src="/images/whatis.jpg"></img>
                    <RenderComments commentsData={props.commentsData}/>
                </Col>
            </div>
        </div>
    )
}

export default Comments;