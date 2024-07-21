import React, {  useEffect, useState } from "react";

import { collection, getDocs, getFirestore, query } from "firebase/firestore";
import { app } from "../firebase";
import Song from "./Song";
import useUrlStore from "../store/urlStore";

function LikedMusic() {
 
  
 
  const [lList, setlList] = useState([])
  const db = getFirestore(app);
  const like = useUrlStore((state) => state.like);


  const fetchdata = async () => {

    const q = query(collection(db, "songs"));

    const querySnapshot = await getDocs(q);
 //   console.log(querySnapshot.docs)
    querySnapshot.forEach((doc) => {
       if (doc.data().islike === true) {
        console.log(doc.id, " => ", doc.data().islike);
        setlList(lList => ([...lList, doc.data()]))
        // addSongUrl(doc.data().songurl);
       }
     

    })

   
  }


  useEffect(() => {
 
    fetchdata()
    setlList([])
  }, [like]);

  return (
    <div>
      {lList.length === 0 ? (
        <div className="container">
          <div className="row">
            <div className="col">
              <h3 className="py-5 text-center">
                You don't have any liked music yet!
              </h3>
              <div className="text-center">
                <i className="bi bi-emoji-frown fs-1"></i>{" "}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h1 className="text-danger text-center py-3">
            Your Liked Music <i className="bi bi-heart-fill text-danger"></i>
          </h1>
          {lList.length>0 && lList.map((item, index) => (

            <div key={index}  >

              {/* {console.log("itrms", item)} */}
              
              <Song song={item} songs={lList} />

            </div>

          ))}
        </div>
      )}

     
    </div>
  );
}

export default LikedMusic;
