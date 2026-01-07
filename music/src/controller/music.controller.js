import { uploadFile,getPresignedUrl } from "../services/storage.service.js";
import musicModel from "../models/music.model.js";




export async function uploadMusic(req, res) {
    const musicFile = req.files['music'][0]
    const coverImageFile = req.files['coverImage'][0]

    try {

        const musicKey = await uploadFile(musicFile)
        const coverImageKey = await uploadFile(coverImageFile)

        const music = await musicModel.create({
            title:req.body.title,
            artist:req.user.fullName.firstName + " " + req.user.fullName.lastName,
            artistId:req.body.artistId,
            musicKey,
            coverImageKey
        })

        return res.status(201).json({message:"Music uploaded successfully",music})
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:error.message})
    }
}


export async function getArtistMusic(req,res){
    try {
        const musicsDocs = await musicModel.find({ artistId: req.user.id }).lean()

        const musics = []
        
        for (let music of musicsDocs) {
            music.musicUrl = await getPresignedUrl(music.musicKey)
            music.coverImageUrl = await getPresignedUrl(music.coverImageKey)
        }

        return res.status(200).json({musics})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:error.message})
    }
}