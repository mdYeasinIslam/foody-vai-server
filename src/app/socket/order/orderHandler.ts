import Order from "../../models/orders/order.model"
import { calculateTotal, createOrderDocument, generateId, validator } from "../../utils/_helper"

const orderHandler = (io:any, socket:any) => {
    
    socket.on('placeOrder', async (data:any, callback:any) => {
        try {
            console.log('place order id', socket.id)
            const validate = validator(data)
         
            if (!validate.isValid) {
             callback({success:false,message:validate.message})
            }
            const total = calculateTotal(data?.items)
            const orderId = generateId()
            const orderData = createOrderDocument(data, orderId, total)

            const newOrder = await Order.create(orderData)

            socket.join(`order-${orderId}`)
            socket.join('customers')

            io.to('admin').emit('newOrder', newOrder)
            
            callback({
              success: true,
              message: "Order placed successfully",
              orderData: newOrder,
            });
        } catch (error) {
            console.log(error)
            callback({success:false,message:"Something went wrong",error:error})
        }
    })
    socket.on('trackOder', async (data:any, callback:any) => {
        try {
            const order = await Order.findById(data?.orderId)
            if (!order) {
                return callback({ success: false, message: "Order not found" })
            }
            socket.join(`order-${data?.orderId}`)
            callback({ success: true, message: "Order tracked successfully", order })

        } catch (error) {
            callback({ success: false, message: "Something went wrong", error: error })
        }
    })
}
export default orderHandler;