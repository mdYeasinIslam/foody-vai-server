import { validator } from "../../utils/_helper"

const orderHandler = (io:any, socket:any) => {
    
    socket.on('placeOrder', async (data:any, callback:any) => {
        try {
            console.log('place order id', socket.id)
            const validate = validator(data)
            if (!validate.isValid) {
             callback({success:false,message:validate.message})
            }
        } catch (error) {
            console.log(error)
        }
    })
}
export default orderHandler;