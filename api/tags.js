const express = require ('express');
const tagsRouter = express.Router();
const { getAllTags, getPostsByTagName}= require('../db')

tagsRouter.get('/', async (req, res, next)=> {
  try { 
    const tags = await getAllTags();

    res.send({
      tags
    });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

tagsRouter.get('/:tagName/posts', async (req, res, next) => {
  const tagName  = req.params.tagname;
  try {
    const posts = await getPostsByTagName(tagname);
        res.send({ posts })
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = tagsRouter;