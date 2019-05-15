const users = [];
const addUser = ({ id, kasutajanimi, jututuba }) => {
    kasutajanimi: kasutajanimi.trim().toLowerCase()
    jututuba: jututuba.trim().toLowerCase()

    if(!kasutajanimi || !jututuba) {
        return {
            error: 'Kasutajanimi ja jututuba peavad olema täidetud'
        }
    }
    const existingUser = users.find((user) => {
        return user.jututuba === jututuba && user.kasutajanimi === kasutajanimi
    });
    if(existingUser) {
        return {
            error: 'Selline kasutajanimi juba on selles toas'
        }
    }
    const user = { id, kasutajanimi, jututuba }
    users.push(user);
    return { user }
}

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id)
    if(index !== -1) {
        return users.splice(index, 1)[0]
    }
}
const getUser = (id) => {
    return users.find((user) => user.id === id)
}
const getUsersInRoom = (jututuba) => {
    return users.filter((user) => user.jututuba === jututuba)
}
module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom

}
