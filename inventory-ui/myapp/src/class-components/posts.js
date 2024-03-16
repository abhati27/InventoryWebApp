import axios from "axios";
import { Component } from "react";

class Post extends Component{
    constructor(){
        super();

        this.state={
            posts: [],
            errMsg:''
        }
    }

    componentDidMount(){
        //call the API 
        const getPosts = async ()=>{
            try{ 
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
                this.setState({
                    posts:  response.data
                })
            }
            catch(err){
                this.setState({
                    errMsg:'API call issue'
                })
            }  
            finally{
                //always called regardless of exception
            }
        }
        getPosts();
         

    }
    render(){
        return(
            <div>
                {
                    this.state.errMsg
                }
                {
                    this.state.posts.map((post,index)=>{
                        return(
                            <div key={index}>
                                {post.title} <br />
                                {post.body} <hr />
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default Post; 