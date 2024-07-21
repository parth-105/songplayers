import * as React from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import useUrlStore from '../store/urlStore';
import Likelogo from './Likelogo';
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';
import { app } from '../firebase';


const Song = ({ song, songs }) => {

    const db = getFirestore(app);

    // const songUrl = useUrlStore((state) => state.songUrl);


   
    const songUrls = useUrlStore((state) => state.songUrls);
    const setSongindex = useUrlStore((state) => state.setSongindex);


    const cursongindex = useUrlStore((state) => state.cursongindex)
    const [currentSong, setCurrentSong] = React.useState(songUrls[cursongindex]);
    const [islike, setislike] = React.useState(song.islike);

    const setSongUrl = useUrlStore((state) => state.setSongUrl);

    const tlike = useUrlStore((state) => state.tlike);



    const togglelike = async (id) => {
     
        const songDocRef = doc(db, "songs", `${id}`);
     
        const docSnapshot = await getDoc(songDocRef);
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();    
        if (data.islike === false) {
            await setDoc(songDocRef, { islike: true }, { merge: true });
            tlike(true)
        }
        else if(data.islike === true){
            await setDoc(songDocRef, { islike: false }, { merge: true });
            tlike(false)
        }
    }

        setislike()
    }

    const cursong = () => {
    
        console.log("cs",cursongindex)
        setSongUrl(song.songurl)
      
        const currentIndex = songUrls.findIndex((song) => song === currentSong);
        
        console.log("cs",currentIndex)
        setSongindex(currentIndex)

    }

    return (
        <div className='border-2 m-1 w-96 min-w-96 min-h-10 rounded-md '>
            <div className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>
            <Card sx={{ display: 'flex' ,height:170  }}  >
                <Box className='border-2 border-black rounded-md w-60  bg-gradient-to-r from-indigo-500 via-purple-400 to-pink-500  text-white '  sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flex: '1 0 auto' }} onClick={() => { setSongUrl(song.songurl) }}>
                        <Typography component="div" variant="h5">
                            {song.name.split(".")[0]}
                        </Typography>
                        <Typography  component="div">
                            <div className='text-black font-semibold'>
                              {}
                            </div>
                        </Typography>
                    </CardContent>

                    <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                       
                        <IconButton aria-label="play/pause" onClick={() => togglelike(song.id)}>
                            {
                               song.islike ? <Likelogo /> : <FavoriteBorderIcon fontSize='large' />
                            }
                        </IconButton>
                    </Box>
                </Box>
                <CardMedia
                  
                    onClick={cursong}
                    component="img"
                    sx={{ height: 150, width: 120 }}
                    className='m-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'
                    image={song.imageUrl}
                    alt="Live from space album cover"

                />
            </Card>
            </div>
        </div>
    )
}

export default Song
