import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import CommonLayout from "@/Layouts/Pedidos/CommonLayout";
import { useEffect } from "react";

export default function DetallePedido({ order }: any) {

    useEffect(() => {
        console.log(order);
    }, [])
    

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Detalle Pedido
                </h2>
            }
        >
        <CommonLayout>
            <div>Detalle Pedido</div>
        </CommonLayout>
        </AuthenticatedLayout>
    )
}