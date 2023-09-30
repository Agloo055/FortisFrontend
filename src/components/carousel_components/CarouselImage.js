import { Image, Modal, Button, ModalHeader, Col, Row, Container, OverlayTrigger } from "react-bootstrap";
import { useState, useEffect } from "react";
import CardDisplay from "../modal-components/CardDisplay";
import CardModal from "../complete-modals/CardModal";
import parseAPI from "../../middleware/parseAPI";

const CarouselImage = (props) => {
  const [modalShow, setModalShow] = useState(false);
  const [cardData, setCardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const setsURL = "https://api.tcgdex.net/v2/en/sets";
  
  // console.log(props);

  
  const getCard = async () => {
    
    try { 
      // const card = await fetch(`${setsURL}${props.setId}/${props.localId}`);
      const card = await fetch(`${setsURL}/${props.setId}/${props.localId}`);
      // let cardUrl = `${props.cardurl}`
      // console.log('cardUrl', cardUrl);
      // console.log('props @line 22:', props);
      // const card = await fetch(`${props.cardurl}`); 
      // console.log(props, 'line 21 - card props @ carouselImage.js');

      if (card) {
        // console.log("line 28",card);
        // console.log("line 29:", card.url);
        if (!card.ok) {
          throw new Error(`HTTP error! Status: ${card.status}`);
        }
        
        const data = await card.json();
        const parsedData = parseAPI(data)
        //console.log(parsedData);
        setCardData(parsedData);
        setLoading(false); // Set loading to false once data is fetched
      }
    } catch (error) {
      // console.log( 'line 37 @ carouselimage.js', error);
      setError(error);
      setLoading(false); // Set loading to false on error
    }
  }
  useEffect(() => {
    // console.log("useEffect line 43");
    getCard()
  }, []);

  const handleImageClick = () => {
    // await getCard()
    setModalShow(true)
    //console.log( "card data line 59 @ carouselImage", cardData);

  }

  const loads = () => {
    return(
      <div></div>
    )
  }
  
  const loaded = () => {
    return (
      <>
        <Image
          className="card-image rounded"
          src={props.image}
          // onClick={() => setModalShow(true)} // call api per card only upon click & setModalShow(true) & access e.event(target)
          // onClick={() => setModalShow(true)}
          // onClick={() => handleImageClick()}
        />

        <CardModal 
          show={modalShow}
          cardData={cardData}
          onHide={() => setModalShow(false)}
        />
      </>
    )
  }

  return cardData ? loaded() : loads()
      
}

export default CarouselImage;



// const handleChange = (e) => {
//   setForm({...form, [e.target.name]: e.target.value })
// }
//  onChange={(e)=>{handleChange(e)}}/>

// getCard() --> console.log(cardData);
// onClick --> getCard --> console.log(cardData);