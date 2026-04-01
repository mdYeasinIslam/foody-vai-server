const orderHandler = (io:any, socket:any) => {
    
    socket.on('placeOrder', async (data, callback) => {
        try {
            console.log('place order id', socket.id)
        } catch (error) {
            console.log(error)
        }
    })
}
export default orderHandler;