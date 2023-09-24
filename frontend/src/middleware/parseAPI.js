import symbolizeEnergy from "./energy.js"

export default function parseAPI (data) {
    const newCard = {}
    const foundCard = data
    newCard.name = foundCard.name
    newCard.category = foundCard.category
    newCard.setLogo = `${foundCard.set.logo}.png`
    newCard.image = `${foundCard.image}/high.png`
    newCard.localId = `${foundCard.localId}/${foundCard.set.cardCount.official}`
    foundCard.illustrator ? newCard.illustrator = foundCard.illustrator : newCard.illustrator = "TBD"
    newCard.rarity = foundCard.rarity
    
    if(newCard.category === 'Pokemon'){
        newCard.typing = []
        foundCard.types.forEach((type) => {
            type = symbolizeEnergy(type)
            newCard.typing.push(type)
        })

        foundCard.stage ? newCard.stage = foundCard.stage : newCard.stage = "Basic"

        if(foundCard.abilities){
            newCard.abilities = []
            foundCard.abilities.forEach((ability) => {
                const abil = {}
                abil.aType = ability.type
                abil.name = ability.name
                abil.effect = ability.effect

                newCard.abilities.push(abil)
            })
        }
        if(foundCard.attacks){
            newCard.moves = []
            foundCard.attacks.forEach((attack) => {
                const move = {}
                move.name = attack.name
                move.damage = attack.damage
                
                move.cost = []
                attack.cost.forEach((c) => {
                    c = symbolizeEnergy(c)
                    move.cost.push(c)
                })
                move.effect = attack.effect
                newCard.moves.push(move)
            })
        }

        foundCard.weaknesses ? newCard.weakness = `${symbolizeEnergy(foundCard.weaknesses[0].type)} ${foundCard.weaknesses[0].value}` : null
        foundCard.resistances ? newCard.resistances = `${symbolizeEnergy(foundCard.resistances[0].type)} ${foundCard.resistances[0].value}` : null
        newCard.retreat = foundCard.retreat
        newCard.hp = foundCard.hp

    } else if(newCard.category === 'Energy'){
        newCard.energyType = foundCard.energyType
        newCard.effect = foundCard.effect

    } else if(newCard.category === 'Trainer'){
        newCard.trainerType = foundCard.trainerType
        newCard.effect = foundCard.effect
    } else {
        throw new TypeError('Not a correct Catagory!')
    }

    return newCard
}

const test = async () => {
    const api = `https://api.tcgdex.net/v2/en/sets/swsh3/162`
    const response = await fetch(api)
    const data = response.json
    const parsedData = parseAPI(data)
    console.log(data)
}