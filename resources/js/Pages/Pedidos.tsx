import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import CommonLayout from '@/Layouts/Pedidos/CommonLayout';
import { Head, router } from '@inertiajs/react';

export default function Pedidos({ pedidos }: any) {
    console.log('pedidos:', pedidos);
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Mis Pedidos
                </h2>
            }
        >
            <Head title="Pedidos" />
            <CommonLayout>
                {pedidos.length ? (
                    <ul style={{ cursor: 'pointer' }}>
                        {pedidos.map((pedido: any) => (
                            <li
                                key={pedido.order_id}
                                id={pedido.order_id}
                                onClick={() =>
                                    router.visit(`pedidos/${pedido.order_id}`)
                                }
                            >
                                {pedido.name} -{' '}
                                {new Date(pedido.created_at).toLocaleString()}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <>
                        Todavía no has hecho ningún pedido!
                        <button
                            onClick={() =>
                                router.visit('pedidos/create', {
                                    method: 'get',
                                })
                            }
                            style={{
                                border: '1px solid black',
                                marginLeft: '1rem',
                                padding: 4,
                                borderRadius: 25,
                            }}
                        >
                            <b>Crear pedido</b>
                        </button>
                    </>
                )}
            </CommonLayout>
        </AuthenticatedLayout>
    );
}
