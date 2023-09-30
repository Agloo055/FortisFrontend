import {useState, useEffect} from "react"
import { Button, Container, Card, Form } from "react-bootstrap"
import energies from "../assets/energy_symbols/Energies"
import { useNavigate } from "react-router-dom"

const CreateCol = (props) => {
    const navigate = useNavigate()
    
    // Inital Form State
    const emptyForm = {
        name:"",
        description:"",
        img:""

    }

    // State that holds the form data
    const [form, setForm] = useState(emptyForm)

    //Function that handles changes in the form
    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
        
    }
    // DEBUG: Added to see the data as its being updated
    // useEffect(()=>{
    //     console.log(form)
    // })

    // handle submitt for this form
    const handleSubmit = (e) => {
        e.preventDefault()
        props.createCollection(form)
        setForm(emptyForm)
        navigate('/collections')
    }

    const energyArray = () => {
        const eArr = []
        for(let energy in energies){
            const enObj = {}
            enObj.name = energy
            enObj.img = energies[energy]
            eArr.push(enObj)
        }

        return eArr.map((energy, idx) => {
            return (
                <option value={energy.img}>{energy.name}</option>
            )
        })
    }
 

    // Generates the form
    return (
        <Container>
            <h1>Create Collection</h1>
            <Form onSubmit={(e) => handleSubmit(e)}>
                <Form.Group>
                    <Form.Label for="enterColName">Collection Name</Form.Label>
                    <Form.Control name="name" value={form.name} type="text" id="enterColName" placeholder="Enter A Name For This Collection" onChange={(e) => {handleChange(e)}} />
                </Form.Group>
                <Form.Group>
                    <Form.Label for="enterColDes">Collection Description</Form.Label>
                    <Form.Control name="description" value={form.description} type="textarea" rows={3} id="enterColDes" placeholder="Enter A Description For This Collection" onChange={(e) => {handleChange(e)}} />
                </Form.Group>
                <Form.Group>
                    <Form.Label for="enterColImage">Collection Icon</Form.Label>
                    <Form.Select name="img" id="enterColImage" placeholder="Select Icon" onChange={(e) => handleChange(e)}>
                        <option>Select Icon</option>
                        {energyArray()}
                    </Form.Select>
                </Form.Group>
                <Button type="submit">
                    Create Collection
                </Button>
            </Form>
        </Container>
    )
}
export default CreateCol