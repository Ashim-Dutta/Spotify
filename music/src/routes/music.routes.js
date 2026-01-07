import express from "express";
import multer from "multer";
import * as musicController from "../controller/music.controller";
import * as authMiddleware from "../middlewares/auth.middleware";




const upload = multer({
    storage:multer.memoryStorage(),
})
const router = express.Router();


router.post('/upload',authMiddleware.authArtistMiddleware,upload.fields([
    {name:'music',maxCount:1},
    {name:'coverImage',maxCount:1}
]), musicController.uploadMusic)


router.get('/artist-musics',authMiddleware.authArtistMiddleware,musicController.getArtistMusic)

export default router