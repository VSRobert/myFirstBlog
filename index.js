import express from "express";
import lodash from "lodash";

const app = express();

app.set('view engine', 'ejs'); //When you set the view engine in this way, Express will use the specified view engine to render 
                               //templates without explicitly mentioning the file extension. 
                               //For example, if you have a file named index.ejs in your "views" folder

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

const homeStartingContent = "This is just a simple blog website created with Express.js, Node.js & EJS on which you can add a new post on the homepage and delete it. It's not linked to any database because this is not the purpose."
const aboutContent = "This is just a simple blog website created with Express.js, Node.js & EJS on which you can add a new post on the homepage and delete it. It's not linked to any database because this is not the purpose."
const contactContent = 'You cand find my contact on the LinkedIn button from the footer below.'

const posts = [] //the content that will be created (but not saved because we do not use any DB)

//root route method , rendering posts[] on home page
app.get('/', (req, res) => {
  res.render('home',
    {
      homeContent: homeStartingContent,
      posts
    })
})

//about route, with some static contents 
app.get('/about', (req, res) => {
  res.render('about',
    {
      aboutContent
    })
})

//contact route with static content
app.get('/contact', (req, res) => {
  res.render('contact',
    {
      contactContent
    })
})

//compose route 
app.get('/compose', (req, res) => {
  res.render('compose')
})

//composes post method that accepts inputs, processes it with body-parser and stores an sn object in the post array
app.post('/compose', (req, res) => {
  const postTitle = req.body.postTitle
  const postContent = req.body.postContent
  const postObj = {
    title: postTitle,
    content: postContent
  }
  posts.push(postObj)
  res.redirect('/')
})

// method to set up routes
app.get('/posts/:postID', (req, res) => {
  let postTitle = req.params.postID
  let postContent = ''
  let title = ''
  
  posts.forEach((post) => {
    title = post.title
    content = post.content
  })

  if (_.toLower(postTitle) == _.toLower(title)) {
    res.render(
      'post', 
      {
        title,
        content
      })
  }
})

//////////////////////////////////////////////////////////////////////////

// Delete route
app.get('/posts/:postID/delete', (req, res) => {
  const postId = req.params.postID;

  // Remove the post from the posts array
  posts.splice(postId, 1);

  res.redirect('/');
});

// app .listen
app.listen(3000, () => {
  console.log('Server started on port 3000')
})