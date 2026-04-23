import express from 'express';
import  { handleCreatePost,
          getAllPosts,
          handleLike,
          handleDelete
        } from '../controllers/CommunityFeed.js';
import upload from '../middleware/CommunityFeed.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/test', (req, res) => {
  res.json({ message: "Community route works!" });
});

router.post(
  "/create-posts",
  upload.single('image'),
  handleCreatePost
);

router.get(
  "/posts",
  getAllPosts,
);

router.post(
  "/like/:postId",
  handleLike
);

router.delete(
  "/delete/:postId",
  handleDelete
);

export default router;