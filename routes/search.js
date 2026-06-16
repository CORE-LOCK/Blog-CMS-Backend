import express from 'express';
import {searchBlogs} from '../controllers/searchController.js';

const router = express.Router();

router.get("/search", searchBlogs);

export default router;