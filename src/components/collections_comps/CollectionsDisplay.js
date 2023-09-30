import {useState, useEffect} from "react"
import { Button, Container } from "react-bootstrap"
import {Link} from "react-router-dom"

const CollectionsDisplay = (props) => {
    const [collections, setCollections] = useState(null)

    //Backend Call
    const colURL = "https://fortis-backend-c8c49038070a.herokuapp.com/collections/"

    // Function that GETS a list of the collections
    // const getCollections = async () => {
    //     const response = await fetch(colURL)
    //     const data = await response.json()
    //     setCollections(data.data)
    // }

    // useEffect(() => {
    //     getCollections()
    // },[])

    const handleDeletion = (e) => {
        e.preventDefault()
        props.deleteCollection(e.target.value)
    }

    const Loaded = () =>{
        //console.log(collections)
       
        const displayCollections = props.collections.map((ele, index) => {
            return(
                <div className="collection-link-container d-flex flex-column align-items-center border rounded text-center p-2 m-1">
                    <Link className="m-auto" to={`/collections/${ele._id}`}>
                        <Container fluid>
                                <h5 className="">{ele.name}</h5>
                                <p>{ele.cards.length} cards in collection</p>
                        </Container>
                    </Link>
                    <Button className="bg-none mt-auto" variant="danger" value={ele._id} onClick={(e)=>handleDeletion(e)}>
                        <p className="fs-6 m-0">
                        Delete Collection
                        </p>
                    </Button>
                </div>
                
            )
        })
        return (
            <Container className="d-flex flex-row justify-content-center flex-wrap">
                {displayCollections}
            </Container>
        )

    }
    const Loading = () => {
        return(
            <h3>Fetching Collections</h3>
        )

    }
    // Returns Loading if collections is null, Return Loaded once collections is populated with data
    return props.collections ? Loaded() : Loading()
}
export default CollectionsDisplay