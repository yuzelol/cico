import axios from 'axios'

const update = (property, unit, update) => {
    console.log('update request')
    return axios.post(`https://cico-be.yuze.now.sh/api/${property}/${unit}`, update)
}

const createNote = (property, unit, note) => {
    return axios.post(`https://cico-be.yuze.now.sh/api/${property}/${unit}/new`, note)
}

const updateNote = (property, unit, item, update) => {
    return axios.post(`https://cico-be.yuze.now.sh/unit/${property}/${unit}/${item}`, update)
}

const deleteNote = (property, unit, item) => {
    axios.delete(`https://cico-be.yuze.now.sh/api/${property}/${unit}/${item}`)
}

export default { update, createNote, updateNote, deleteNote }