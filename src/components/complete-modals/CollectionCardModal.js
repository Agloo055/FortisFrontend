import { Image, Row, Modal, ModalHeader, Container, Col, Button } from "react-bootstrap"
import { useState } from "react";
import CardDisplay from "../modal-components/CardDisplay";
import PkmActionDetails from "../modal-components/PkmActionDetails"
import TrainerActionDetails from "../modal-components/TrainerActionDetails"
import EnergyActionDetails from "../modal-components/EnergyActionDetails"
import { useParams, useNavigate } from "react-router-dom";

function CollectionCardModal ({card, show, onHide, deletePokeCard}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const params = useParams()
  const navigate = useNavigate()

  const cardType = () => {

    if (card.category === "Pokemon") {
      return (
        <PkmActionDetails 
          name={card.name}
          hp={card.hp}
          stage={card.stage}
          types={card.typing}
          evolveFrom={card.evolveFrom}
          abilities={card.abilities}
          attacks={card.moves}
          resistances={card.resistances}
          weaknesses={card.weaknesses}
          retreat={card.retreat}
        />
      )
    } else if (card.category === "Trainer") {
      return (
        <TrainerActionDetails
          name={card.name}
          trainerType={card.trainerType}
          effect={card.effect}
        />
      )
    } else if (card.category === "Energy") {
      return (
        <EnergyActionDetails 
          name={card.name}
          energyType={card.energyType}
          effect={card.effect}
        />
      )
    }
  }

  const handleDeletion = (e) => {
    e.preventDefault()
    deletePokeCard(params.id, e.target.value)
    navigate(`/collections/`)
  }

  // Render the loaded data
  const loaded = (props) => {
    if (card) {
      // console.log('CMC Card: ', card);
      return (
        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={show} // Use the destructured 'show' prop here
          onHide={onHide} // Use the destructured 'onHide' prop here
        >
          <ModalHeader closeButton></ModalHeader>
          <Modal.Body className="d-flex flex-column flex-sm-row justify-content-around px-2 shadow">
            
            <CardDisplay
              image={`${card.image}`}
              localId={card.localId}
              variants={card.rarity}
              illustrator={card.illustrator}
              category={card.category}
              setlogo={card.setLogo}
            />
  
            {/* Gets Card Category then Returns Appropriate Component  */}
            <Container>
              {cardType()}
              <Button variant="danger" value={card._id} onClick={(e)=>handleDeletion(e)} >
                Remove Card
              </Button>
            </Container>
  
          </Modal.Body>
        </Modal>
      );
    } else {
      //console.log('No CMC Card');
      return null; // Or display a loading message or handle the case when card is null
    }
  };

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
    //console.log("cardmodal.js", error);
    return renderError();
  } else {
    // console.log('card modal loaded');
    return loaded();
  }
}

export default CollectionCardModal;