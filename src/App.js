import Navbar from "./components/Navbar"
import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Homepage from "./pages/Homepage";
import Searchpage from "./pages/Searchpage";
import Sitetitle from "./components/Sitetitle"
import Collections from "./pages/Collections"
import CollectionsInfo from "./pages/CollectionInfo";
import CreateCol from "./pages/CreateCol";
import EditCol from "./pages/EditCol"

import './styles.css'

function App() {
    //console.log('online') // Console log 
    const [collections, setCollections] = useState(null)
    const [pokeCards, setPokeCards] = useState(null)

    const collectionURL = "https://fortis-backend-c8c49038070a.herokuapp.com/collections/"
    // const collectionURL = "http://localhost:4000/collections/"

    //Collection crud
    const getCollections = async () => {
        const response = await fetch(collectionURL)
        const data = await response.json()
        setCollections(data.data)
    }

    const createCollection = async (collection) => {
        await fetch(collectionURL, {
            method:"post",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(collection)
        })

        getCollections()
    }

    const updateCollection = async (collection, id) => {
        await fetch(collectionURL + id, {
            method:"put",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(collection)
        })

        getCollections()
    }

    const deleteCollection = async (id) => {
        await fetch(collectionURL + id, {
            method: "delete"
        })

        getCollections()
    }

    //PokeCard crud
    const getPokeCards = async (collectionID) => {
        const response = await fetch(`${collectionURL}${collectionID}/cards/`)
        const data = await response.json()
        setPokeCards(data.data)
    }

    const createPokeCard = async (collectionID, pokeCard) => {
        await fetch(`${collectionURL}${collectionID}/cards/`, {
            method:"post",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(pokeCard)
        })

        getCollections()
    }

    const updatePokeCard = async (collectionID, pokeCard, id) => {
        await fetch(`${collectionURL}${collectionID}/cards/` + id, {
            method:"put",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(pokeCard)
        })

        getCollections()
    }

    const deletePokeCard = async (collectionID, id) => {
        await fetch(`${collectionURL}${collectionID}/cards/` + id, {
            method: "delete"
        })

        getCollections()
    }

    useEffect(() => {
        //console.log(collectionURL)
        getCollections()
    }, [])

    return (
        <Container fluid className="d-flex flex-column align-items-center bg-light h-100 p-0">
        <Sitetitle />
        <Navbar />
        <Routes>
            <Route path="/" element={<Homepage/>}/>
            <Route path="/search" element={<Searchpage collections={collections} createPokeCard={createPokeCard}/>}/>
            <Route path="/search/set/:input" element={<Searchpage collections={collections} createPokeCard={createPokeCard}/>}/>
            <Route path="/search/set/:input/card/:card" element={<Searchpage collections={collections} createPokeCard={createPokeCard}/>}/>
            <Route path="/collections" element={<Collections collections={collections} deleteCollection={deleteCollection}/>}/>
            <Route path="/collections/:id" element={<CollectionsInfo deletePokeCard={deletePokeCard} deleteCollection={deleteCollection}/>}/>
            <Route path="/create" element={<CreateCol collection={collections} createCollection={createCollection}/>}/>
            <Route path="/collections/:id/edit" element={<EditCol collections={collections} updateCollection={updateCollection}/>}></Route>
        </Routes>
        </Container>
    );
}

export default App;
