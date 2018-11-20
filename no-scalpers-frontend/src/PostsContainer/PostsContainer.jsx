import React, {Component} from 'react';
import CreatePost from './CreatePost/CreatePost';
import PostList from './PostsList/PostsList';
import { Col, Container, Row} from 'reactstrap';
import './PostContainer.css';



class Posts extends Component {
    constructor () {
        super();
        this.state = {
            posts: [],
            username: '',
            post: ''
        }
    }
    //get Posts from server
    getPosts = async () => {
        const posts = await fetch('http://localhost:9000/posts');
        const postsJSON = await posts.json();
        console.log(postsJSON, ' JSON posts')
        return postsJSON
      }

    // Component Did Mount Check
      componentDidMount(){
        console.log(this.props.id, '<----this is userId ≠≠≠≠≠≠≠')
        this.getPosts().then((posts) => {
          this.setState({posts: posts})
          console.log(posts, ' componentdidmount posts container')
        }).catch((err) => {
          console.log(err);
        })
      }

    // Add a Post function to be passed down to child
    addPost = async (post, e) => {
        e.preventDefault();
        console.log(post);
        try {
            const createdPost = await fetch('http://localhost:8080/posts', {
                method: 'POST',
                body: JSON.stringify(post),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log("DADDY")
            console.log(createdPost);
            const parsedPost = await createdPost.json();
            console.log(parsedPost)
            this.setState({
                posts: [...this.state.posts, parsedPost]
            })
        } catch (err) {

        }
    }


    // Delete Post function 
    deletePost = async (id) => {

        try {
            const deletedPost = await fetch('http://localhost:8080/posts/' + id, {
                method: 'DELETE'
            });
            const deletedPostJSON = await deletedPost.json();
            this.setState({posts: this.state.posts.filter((post)=> post._id !== id)})
            console.log(deletedPostJSON)
        } catch (err) {
        }
    }


    // Edit Post 

  
    
    submitEdit = async (postToEdit) => {
        console.log(postToEdit)
            try {
                const editedPost = await fetch ('http://localhost:9000/posts/' + postToEdit._id, {
                    method: 'PUT', 
                    body: JSON.stringify({
                        title: postToEdit.title,
                        commentBody: postToEdit.commentBody
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                const editedPostJSON = await editedPost.json();
                const newPostArrayWithEdited = this.state.posts.map((post) => {
                if(post._id === editedPostJSON.data._id){
                    post = editedPostJSON.data
                    }
                return post
                });
                this.setState({
                    posts: newPostArrayWithEdited,
                    modal: false
                        })
            } catch (err) {
                return err
            }    
        }
    render() {


        return (
            <Container className="post-container">
                    <Row>
                        <Col> 
                            <CreatePost addPost = {this.addPost} id={this.props.id} />
                        </Col>
                    </Row>
                    <Row>
                        <Col className="post-list" > 
                            <PostList deletePost = {this.deletePost} posts={this.state.posts}  submitEdit = {this.submitEdit} handleChange = {this.handleChange}/>
                        </Col>
                    </Row>
            </Container>
          
        )

    }



}

export default Posts;
