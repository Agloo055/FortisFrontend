// Element that will display all the different card series and cards within that series
// Will also display results of searching for a specific card/cards

// Imports
import CardSm from "./CardSm";
import {useState, useEffect} from 'react' // State import
import {Link} from "react-router-dom"
import { useParams } from "react-router-dom"

const ShowSearch = () => {
    const params = useParams()
    console.log(params.input)
    const setsurl = `https://api.tcgdex.net/v2/en/sets/`
    const cardurl = `https://api.tcgdex.net/v2/en/sets/` + params.input
    // Refresh page Function

    


   
    
    

   

    
    
    
    //console.log(url)
    
    // useState variables
    const [cardEl, setCardEl] = useState(null)// contains the information pulled from the Pokemon API 
    const [displayState, setDisplay] = useState(null) // Contains information on what is being displayed 1 means the sets are displayed, 2 means the cars in the set are displayed
    

    // fetchs the set data
    const getSets = async () =>{
        
        const response = await fetch(setsurl)
        const data = await response.json()
        // Console Log to make sure the data from the API is coming through
        console.log(`This is the Data`)
        console.log(data)
        //console.log(data[0].name)
        setCardEl(data)
        setDisplay(1)
         
    }
    const getCards = async () => {
        const response = await fetch(cardurl)
        const data = await response.json()
        // Console Log to make sure the data from the API is coming through
        console.log(`This is the Data`)
        console.log(data)
        //console.log(data[0].name)
        setCardEl(data.cards)
    }
    

    // Setting State
    useEffect(() => {

        params.input ? getCards() : getSets()
        
        
    }, [])
    console.log('CardEl Value')
    console.log(cardEl)

    // Logic that loads when data is avalible
    const Loaded = () => {
        console.log(useState)
        console.log(displayState)


        const displayArray = cardEl.map((ele, index) =>{
            return (
                
                <Link to={`/search/set/${ele.id}` }>

                    <CardSm
                        {...ele}
                        key={index}
                        
                    />
                    
                </Link>
                
                
                

            )
        })
        
        return(
            <div>
                {displayArray}
            </div>
        )
        
        
     

    }
    const Loading = () => {
        return(
            <h1>Fetching Data</h1>
        )

    }
    
    //
    return cardEl ? Loaded() : Loading()
    
}
export default ShowSearch