import express from 'express';
import multer from 'multer';
import { analyzeResume } from '../controllers/resumeController.js';

const router = express.Router();

// Multer configuration: store temporarily in an 'uploads' directory
const upload = multer({ dest: 'uploads/' });

// Route expects a file input named 'resume'
router.post('/analyze', upload.single('resume'), analyzeResume);

export default router;