import express from "express";
import multer from "multer";
import * as musicController from "../controller/music.controller";
import * as authMiddleware from "../middlewares/auth.middleware";




const upload = multer({
    storage:multer.memoryStorage(),
})
const router = express.Router();



router.get('/', authMiddleware.authUserMiddleware, musicController.getAllMusics)

router.get('/get-details/:id', authMiddleware.authUserMiddleware, musicController.getMusicById)

router.post('/upload',authMiddleware.authArtistMiddleware,upload.fields([
    {name:'music',maxCount:1},
    {name:'coverImage',maxCount:1}
]), musicController.uploadMusic)


router.get('/artist-musics', authMiddleware.authArtistMiddleware, musicController.getArtistMusic)

router.post('/playlist', authMiddleware.authUserMiddleware, musicController.getPlaylist)

router.get('/playlist/:id',authMiddleware.authUserMiddleware,musicController.getPlaylistById)

export default router