let newSocket;

const socketController = (socket) => {
    console.log('Cliente conectado', socket.id)
    newSocket = socket;
}

// Obtener el socket creado
const getSocket = () => newSocket;

module.exports = {
    socketController,
    getSocket
}
