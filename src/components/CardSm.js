import { Image, Row, Card } from "react-bootstrap"

const CardSm = ({name, image}) => {
    return(
        <Card class="cardSmCont d-flex flex-column align-items-center justify-content-between text-info" id={name}>
                <Image fluid
                    src={image}
                    className="set-display object-fit-contain"
                />
                <p>{name}</p>
        </Card>
    )
    
}
export default CardSm