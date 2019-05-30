const Router = window.ReactRouter.Router;
const Route = window.ReactRouter.Route;
const hashHistory = window.ReactRouter.hashHistory;
const Link = window.ReactRouter.Link;
const browserHistory = window.ReactRouter.browserHistory;
class Navbar extends React.Component {
    render() {
        return (
            <div className="navbar">
            <a href="#" className="navbar__punkt" id="homeHyperlink" className="active">Home page</a>
            <a className="navbar__punkt" id="addHyperLink" href="/home#/addPost">Create post</a>
            
            <hr/>
    <div id="app"> 
    </div>
</div>
  )
  }
}
class AddPost extends React.Component {
    constructor(props) {
      super(props);
      this.addPost = this.addPost.bind(this);
      this.handleTitleChange = this.handleTitleChange.bind(this);
      this.getPostWithId = this.getPostWithId.bind(this);
      this.handlePosttextChange = this.handlePosttextChange.bind(this);
      this.state = {
        title:'',
        posttext:'',
        id: ''
      }
    }
    getPostWithId(){
      const id = this.props.params.id;
      const self = this;
      axios.post('/getPostWithId', {
        id: id
      })
      .then(function (response) {
        if(response){
          self.setState({title:response.data.title});
          self.setState({posttext:response.data.posttext});  
         
        }
      })
      .catch(function (error) {
        console.log('error is ',error);
      });
    }
    componentDidMount(){
      document.getElementById('addHyperLink').className = "active";
      document.getElementById('homeHyperlink').className = "";
      this.getPostWithId();
    }

    addPost(){
      axios.post('/addPost', {
        title: this.state.title,
        posttext: this.state.posttext,
        id: this.state.id
        
    })
      .then(function (response) {
        console.log('reponse from add post is ',response);
        hashHistory.push('/')
        
      })
      .catch(function (error) {
        console.log(error);
      });
    }


    handleTitleChange(e){
      this.setState({title:e.target.value})
    }
    handlePosttextChange(e){
      this.setState({posttext:e.target.value})
    }
    render() {
      return (
       <div>
             <Navbar/>
             <div className="container">
              <form role="form" >
              <div className="form-group">
    <input value={this.state.title ? this.state.title : ''} type="text" onChange={this.handleTitleChange} className="form-control" id="title" name="title" placeholder="Title" required />
</div>
                
<div className="form-group">
    <textarea value={this.state.posttext ? this.state.posttext : ''} className="form-control" onChange={this.handlePosttextChange} type="textarea" id="posttext" placeholder="Text" maxlength="140" rows="7"></textarea>
</div>
                  
                <button type="submit"  id="submit" name="submit" className="btn btn-primary" onClick={this.addPost}>Add Post</button>
              </form>
          </div>
          </div>
      )
    }
}

class ShowPost extends React.Component {
    constructor(props) {
      super(props);
      this.updatePost = this.updatePost.bind(this);
      this.deletePost = this.deletePost.bind(this);
      this.getPost = this.getPost.bind(this);
      this.state = {
        posts:[]
      };
     
    }
   deletePost(id){
  
  const self = this
    axios.post('/deletePost', {
      id: id
    })
    .then(function (response) {
      self.getPost();
    })
    .catch(function (error) {
      console.log('Error is ',error);
    });
  
}
    getPost(){
      const self = this;
      axios.post('/getPost', {
      })
      .then(function (response) {
        self.setState({posts:response.data})
      })
      .catch(function (error) {
      });
    }
    
    
    updatePost(id) {
      hashHistory.push('/addPost/' + id)
      console.log(id)
    }
    

    componentDidMount(){
      this.getPost();
      
    }
    
    render() {
      return (
          <div>
          <Navbar/>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Number</th>
                <th>Title</th>
                <th>Text</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.posts.map(function(post,index) {
                   return <tr key={index} >
                            <td>{index+1}</td>
                            <td>{post.title}</td>
                            <td>{post.posttext}</td>
                            <td>
                              <span onClick={this.updatePost.bind(this,post._id)} className="glyphicon glyphicon-scissors"></span>
                            </td>
                            <td>
                              <span onClick={this.deletePost.bind(this,post._id)} className="glyphicon glyphicon-trash"></span>
                            </td>
                          </tr>
                }.bind(this))
              }
            </tbody>
</table>

          </div>
      )
    }
}

ReactDOM.render(
    <Router history={hashHistory}>
        <Route component={ShowPost} path="/"></Route>
        <Route component={AddPost} path="/addPost(/:id)"></Route>
    </Router>,
document.getElementById('app'));

