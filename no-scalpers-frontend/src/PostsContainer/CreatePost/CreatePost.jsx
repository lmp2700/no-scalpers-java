import React, {Component} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, Form, Container, Row, Col} from 'reactstrap';


class CreatePost extends Component {
    constructor () {
        super();

        this.state = {
            title: '',
            comment: ''
        }
    }

    handleInput = (e) => {
        e.preventDefault();
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value
        })

    }

    render () {
        return (

            <div>
                <h1>Create a Post</h1>
                      <Container>
                        <Form id="new-post-form" onSubmit={this.props.addPost.bind(null, this.state)}>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Label for="title">Post Title</Label>
                                        <Input type="text"  value = {this.state.title} onChange={this.handleInput} name="title" id="title" />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Label for="comment">Comment</Label>
                                        <Input type="textarea" value = {this.state.comment} onChange={this.handleInput} name="comment" id="comment" />
                                    </FormGroup>
                                </Col>
                            </Row>            
                        <Button input type="submit" value="Submit">Submit</Button>
                     </Form>           
                 </Container>  
            </div>
        )
    }

}
export default CreatePost;