import {  collection, doc, getDocs, getFirestore, query, setDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { app } from "../firebase";
import Song from "./Song";

import useUrlStore from "../store/urlStore";
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';




const Add = () => {
    const docId = Date.now();
    const db = getFirestore(app);
    const storage = getStorage(app);
    const [folderList, setFolderList] = useState([])
    const [img, setimg] = useState("")

    const audioRef = React.useRef(null)

    const songUrl = useUrlStore((state) => state.songUrl);
    const setSongUrl = useUrlStore((state) => state.setSongUrl);
    const cursongindex = useUrlStore((state) => state.cursongindex)


    const addSongUrl = useUrlStore((state) => state.addSongUrl);
    const songUrls = useUrlStore((state) => state.songUrls);

    const like = useUrlStore((state) => state.like);

    const setSongindex = useUrlStore((state) => state.setSongindex);
    const [currentSong, setCurrentSong] = React.useState(songUrls[cursongindex]);



    const playNext = () => {

        // console.log("plyanext called", songUrls)
        const currentIndex = songUrls.findIndex((song) => song === songUrl);
        // console.log("plyanext called", currentIndex)
        const nextIndex = (currentIndex + 1) % songUrls.length;
        setSongUrl(songUrls[nextIndex]);

    };

    const toggleplay = () => {
        const startbtn = document.getElementById("sound");
        startbtn.addEventListener("click", () => {
       
        }
    )
    const audioElement = audioRef.current;
    audioElement.play();
    }


    const onimgUpload = async (file) => {



        // console.log("img", docId.toString())

        const fileRef = ref(storage, "file/" + file.name);


        // console.log("Uploaded a blob or file!");
        uploadBytes(fileRef, file)
            .then((snapshot) => {
                // console.log("Uploaded a blob or file!");
            })
            .then((resp) => {
                getDownloadURL(fileRef).then(async (downloadURL) => {
                    console.log("File available at", downloadURL);
                    setimg(downloadURL)
                    //   await updateDoc(songRef, { songimg: downloadURL });
                    //  await updateDoc(songDocRef, { imageUrl: downloadURL });
                    //  newsong.imageUrl = downloadURL;

                });
            });

    }

    const onFileUpload = async (file) => {
        if (file) {

            const fileRef = ref(storage, "file/" + file.name);
            //   const imgRef = ref(storage, "image/" + file.name);

            const newsong = {
                name: file.name,
                type: file.name.split(".")[1],
                size: file.size,
                modifiedAt: file.lastModified,
                //  createdBy: session.user.email,
                //   imageUrl: downloadURL,
                // songurl: downloadURL,
                // songimg: "",
                id: docId,
                islike: false
            };

            // const songDocRef = await addDoc(collection(db, "songs",docId), newsong);

            const songDocRef = doc(db, 'songs', docId.toString());
            await setDoc(songDocRef, newsong);

            uploadBytes(fileRef, file)
                .then((snapshot) => {
                    console.log("Uploaded a blob or file!");
                })
                .then((resp) => {
                    getDownloadURL(fileRef).then(async (downloadURL) => {
                        console.log("File available at", downloadURL);
                        //  const song =   await setDoc(doc(db, "files", docId.toString()), {
                        //         name: file.name,
                        //         type: file.name.split(".")[1],
                        //         size: file.size,
                        //         modifiedAt: file.lastModified,
                        //         //  createdBy: session.user.email,
                        //         //   imageUrl: downloadURL,
                        //         songurl: downloadURL,
                        //         songimg: "",
                        //         id: docId
                        //     });
                        await updateDoc(songDocRef, { songurl: downloadURL });
                        newsong.songurl = downloadURL;
                        await updateDoc(songDocRef, { imageUrl: img });
                        newsong.imageUrl = img;
                        console.log(docId.toString())
                        // closeModal(true);
                        // setShowToastMsg("File Uploaded Successfully!");
                    });
                });


        }
    };

    const fetchdata = async () => {
        let ignore = false;
        const q = query(collection(db, "songs"));

        const querySnapshot = await getDocs(q);
        if (ignore) return;
        // console.log(querySnapshot.docs)
        querySnapshot.forEach((doc) => {

            setFolderList(folderList => ([...folderList, doc.data()]))
            addSongUrl(doc.data().songurl);


        })

       
    }



    const playNextSong = () => {
     
        setSongUrl(currentSong);
        const currentIndex = songUrls.findIndex((song) => song === currentSong);
        const nextIndex = (currentIndex + 1) % songUrls.length;
        setCurrentSong(songUrls[nextIndex]);
        setSongindex(nextIndex)
        // console.log("currr",cursongindex)
    };

    const playPreviousSong = () => {
        // console.log("ffff", currentSong)

        setSongUrl(currentSong);
        const currentIndex = songUrls.findIndex((song) => song === currentSong);
        const prevIndex = (currentIndex - 1 + songUrls.length) % songUrls.length;
        setCurrentSong(songUrls[prevIndex]);
        setSongindex(prevIndex)


        //    console.log("pre",currentSong)
    };


        useEffect(() => {      
        fetchdata()
        setFolderList([])
        }, [])

    useEffect(() => {
        toggleplay()
    }, [songUrl])

    useEffect(() => {
        fetchdata()
        setFolderList([])
    }, [like]);

    return (
        <>
            <div>
                <form method="dialog" className="modal-box p-9 items-center w-[360px] md:block hidden">
                    <input
                        id="dropzone-file"
                        type="file"
                        //   className="hidden"
                        onChange={(e) => onimgUpload(e.target.files[0])}
                    />
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                        ✕
                    </button>
                    <div
                        className="w-full items-center 
          flex flex-col justify-center gap-3"
                    >
                        <div className="flex items-center justify-center w-full">
                            <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg
                                        className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 20 16"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                        />
                                    </svg>
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                        <span className="font-semibold">Click to upload</span> or drag
                                        and drop
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                                    </p>
                                </div>
                                <input
                                    id="dropzone-file"
                                    type="file"
                                    className="hidden"
                                    onChange={(e) => onFileUpload(e.target.files[0])}
                                />
                            </label>
                        </div>
                    </div>
                </form>
               
                <div id="sound" className=" bg-gradient-to-r from-cyan-500 to-blue-500 items-center justify-center md:grid grid-cols-3 gap-4" >
                    {folderList && folderList.map((item, index) => (
                        <div key={index}  >
                            <Song  className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500' song={item} songs={folderList} />
                        </div>
                    ))}
                </div>
              




            </div>
            <div className="sticky m-1 gap-6 bottom-0 justify-center items-center">
                <div className="flex gap-3 bg-green-300">
                    <button onClick={playPreviousSong}><SkipPreviousIcon /></button>
                    <audio  className=" bg-green-300" ref={audioRef} onEnded={playNext} controls src={songUrl}></audio>
                    <button onClick={playNextSong}><SkipNextIcon /></button>
                </div>
            </div>
        </>
    )
}

export default Add
