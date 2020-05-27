import axios from 'axios'

const all = () => {
    return axios.get('https://cico-be.yuze.now.sh/api/properties')
}

// const sync = () => {
//     return axios.get('https://cico-be.yuze.now.sh/api/properties/sync')
// }

export default { all }