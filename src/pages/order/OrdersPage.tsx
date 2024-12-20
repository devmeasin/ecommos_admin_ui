import { Layout } from '@/components/custom/Layout'
import OrderComponent from '@/components/Order'

const OrdersPage = () => {
    return (
        <Layout >
            <Layout.Body>
           
                            {/* <OrdersWX /> */}

                            {/* <OrderTable/>
                            <OrdersTables/> */}
                            {/* <Orders/> */}

                        {/* <div className='p-4'>
                        <OrdersX />
                        </div> */}

                        {/* <OrderStatusX/> */}

                        <OrderComponent/>

                        
                   </Layout.Body>
        </Layout>
    )
}

export default OrdersPage