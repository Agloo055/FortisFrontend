import React from "react";
import { Modal, Button, Col, Container, Image, Tooltip, OverlayTrigger, ModalHeader, Card } from "react-bootstrap";
import { useState, useEffect } from "react";
// import GetCardType from "../modal-components/GetCardType";
import CardDisplay from "../modal-components/CardDisplay";
import RenderToolTip from "../modal-components/RenderToolTip";
import PkmActionDetails from "../modal-components/PkmActionDetails"
import TrainerActionDetails from "../modal-components/TrainerActionDetails"
import EnergyActionDetails from "../modal-components/EnergyActionDetails"


function CardModal (props) {
  // console.log('cardmodal props:', props);
  // console.log('cardmodal props.cardData.name:', props.cardData.name);
  const [modalShow, setModalShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // const [show, setShow] = useState(false);

  const cardData = props.cardData
  //console.log(cardData)

  const cardType = () => {

    if (cardData.category === "Pokemon") {
      return (
        <PkmActionDetails 
          name={cardData.name}
          hp={cardData.hp}
          stage={cardData.stage}
          types={cardData.typing}
          evolveFrom={cardData.evolveFrom}
          abilities={cardData.abilities}
          attacks={cardData.moves}
          resistances={cardData.resistances}
          weaknesses={cardData.weaknesses}
          retreat={cardData.retreat}
        />
      )
    } else if (cardData.category === "Trainer") {
      return (
        <TrainerActionDetails
          name={cardData.name}
          trainerType={cardData.trainerType}
          effect={cardData.effect}
        />
      )
    } else if (cardData.category === "Energy") {
      return (
        <EnergyActionDetails 
          name={cardData.name}
          energyType={cardData.energyType}
          effect={cardData.effect}
        />
      )
    }
  }


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
            image={cardData.image}
            localId={cardData.localId}
            variants={cardData.rarity}
            illustrator={cardData.illustrator}
            category={cardData.category}
            setlogo={cardData.setLogo}
          />

          {/* Gets Card Category then Returns Appropriate Component  */}
          {cardType()}

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

export default CardModal; 