const { requireUser } = require('./utils');

postsRouter.post('/', requireUser, async (req, res, next) => {
  const { title, content, tags = "" } = req.body;

  const tagArr = tags.trim().split(/\s+/)
  const postData = {};

  
  if (tagArr.length) {
    postData.tags = tagArr;
  }

  try {
    postData.authorId = req.user.id;
    postData.title = title;
    postData.content = content;

    const post = await createPost(postData);
    if (post) {
      res.send({ post });
    } else {
      next({ 
        name: 'CreatePostError', 
        message: 'Please log in to post.' 
      })
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});