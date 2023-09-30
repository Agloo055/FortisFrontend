import React from "react";
import { Modal, Button, Col, Container, Image, Tooltip, OverlayTrigger, ModalHeader, Card } from "react-bootstrap";
import { useState, useEffect } from "react";
// import GetCardType from "../modal-components/GetCardType";
import CardDisplay from "../modal-components/CardDisplay";
import RenderToolTip from "../modal-components/RenderToolTip";
import PkmActionDetails from "../modal-components/PkmActionDetails"
import TrainerActionDetails from "../modal-components/TrainerActionDetails"
import EnergyActionDetails from "../modal-components/EnergyActionDetails"


function CardModalCopy (props) {
  // console.log('cardmodal props:', props);
  // console.log('cardmodal props.cardData.name:', props.cardData.name);
  const [modalShow, setModalShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cardData, setCardData] = useState(null);
  const setsURL = "https://api.tcgdex.net/v2/en/sets";

  const getCard = async () => {
    try { 
      //console.log('hi');
      const card = await fetch(`${setsURL}/${props.setId}/${props.localId}`);
      if (card) {
        if (!card.ok) {
          throw new Error(`HTTP error! Status: ${card.status}`);
        }
        
        const data = await card.json();
        // console.log(data);
        setCardData(data);
        setLoading(false); // Set loading to false once data is fetched
      }
    } catch (error) {
      //console.log( 'line 37 @ carouselimage.js', error);
      setError(error);
      setLoading(false); // Set loading to false on error
    }
  }
  useEffect(() => {
    // console.log("useEffect line 43");
    // getCard()
  }, []);

  const handleImageClick = async () => {
    try {
      const card = await fetch(`${setsURL}/${props.setId}/${props.localId}`);
      if (card) {
        if (!card.ok) {
          throw new Error(`HTTP error! Status: ${card.status}`);
        }
        const data = await card.json();
        setCardData(data);
        setLoading(false);
      }
    } catch (error) {
      setError(error);
      setLoading(false);
    }
    setModalShow(true);
  };

  // const cardType = () => {

  //   if (props.cardData.category === "Pokemon") {
  //     return (
  //       <PkmActionDetails 
  //         name={props.cardData.name}
  //         hp={props.cardData.hp}
  //         stage={props.cardData.stage}
  //         types={props.cardData.types}
  //         evolveFrom={props.cardData.evolveFrom}
  //         abilities={props.cardData.abilities}
  //         attacks={props.cardData.attacks}
  //         resistances={props.cardData.resistances}
  //         weaknesses={props.cardData.weaknesses}
  //         retreat={props.cardData.retreat}
  //       />
  //     )
  //   } else if (props.cardData.category === "Trainer") {
  //     return (
  //       <TrainerActionDetails
  //         name={props.cardData.name}
  //         trainerType={props.cardData.trainerType}
  //         effect={props.cardData.effect}
  //       />
  //     )
  //   } else if (props.cardData.category === "Energy") {
  //     return (
  //       <EnergyActionDetails 
  //         name={props.cardData.name}
  //         energyType={props.cardData.energyType}
  //         effect={props.cardData.effect}
  //       />
  //     )
  //   }
  // }


  // Render the loaded data
  const loaded = () => {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <ModalHeader closeButton></ModalHeader>
        <Modal.Body className="d-flex flex-column flex-sm-row justify-content-around px-2 shadow" show={modalShow} >
          
          <CardDisplay
            cardSetId={cardData.setId}
            image={cardData.image}
            localId={cardData.localId}
            variants={cardData.variants}
            cardcountofficial={cardData.set.cardCount.official}
            illustrator={cardData.illustrator}
            category={cardData.category}
            setlogo={cardData.set.logo}
          />

          {/* Gets Card Category then Returns Appropriate Component  */}
          {/* {cardType()} */}

        </Modal.Body>
      </Modal>
    )
  }

  // Render loading state
  const renderLoading = () => {
    //console.log('render loading: line 81');
    return <h1>Loading...</h1>;
  }

  // Render error state
  const renderError = () => {
    //console.log("render error: line 87");
    return <p>Error: {error.message}</p>;
  }

  // Conditional rendering based on loading and error states
  if (loading) {
    return renderLoading();
  } else if (error) {
    //console.log(error, "cardmodal.js");
    return renderError();
  } else {
    return loaded();
  }
}

export default CardModalCopy; 