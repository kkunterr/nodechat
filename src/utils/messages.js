const generateMessages = (kasutajanimi,text) => {
    return {
        kasutajanimi,
        text,
        createdAt: new Date().getTime()
    }
}

const generateLocationMessage = (kasutajanimi, url) => {
    return {
        kasutajanimi,
        url,
        createdAt: new Date().getTime()
    }
}

module.exports = {
    generateMessages,
    generateLocationMessage
}