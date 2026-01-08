import { uploadFile,getPresignedUrl } from "../services/storage.service.js";
import musicModel from "../models/music.model.js";
import playlistModel from "../models/playlist.model.js";





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


export async function getAllMusics(req, res) {

    const { skip = 0, limit = 10 } = req.query
    

    try {
        const musicsDocs = await musicModel.find().skip(skip).limit(limit).lean()

        const musics = []
        
        for (let music of musicsDocs) {
            music.musicUrl = await getPresignedUrl(music.musicKey)
            music.coverImageUrl = await getPresignedUrl(music.coverImageKey)
            musics.push(music)
        }

        return res.status(200).json({message:"Musics fetched successfully",musics})
        
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


export async function createPlaylist(req, res) {
    const { title, musics } = req.body
    
    try {

        const playlist = await playlistModel.create({
            artist:req.user.fullName.firstName + " " + req.user.fullName.lastName,
            artistId:req.user.id,
            title,
            userId:req.user.id,
            musics
        })

        return res.status(201).json({message:"Playlist created successfully",playlist})
        
    } catch (error) {

        console.log(error)
        return res.status(500).json({message:error.message})
        
    }
}


export async function getPlaylist(req, res) {
    try {

        const playlists = await playlistModel.find({
            artistId:req.user.id
        })


        // for (let playlist of playlists) {
        //     for (let music of playlist.musics) {
        //         music.musicUrl = await getPresignedUrl(music.musicKey);
        //         music.coverImageUrl = await getPresignedUrl(music.coverImageKey);
        //     }
        // }

        return res.status(200).json({playlists})
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:error.message})
    }
}
