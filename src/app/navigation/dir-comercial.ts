import {FuseNavigation} from '@plantilla/types';

export const DIR_COMERCIAL: FuseNavigation =
    {
        id: 'dirComercial',
        title: 'Dir. Comercial',
        type: 'group',
        children:
            [
                {
                    id: 'atencionUsuarios',
                    title: 'Atencion Usuarios',
                    type: 'collapsable',
                    icon: 'group',
                    children:
                        [
                            {
                                id: 'padroUsuarios',
                                title: 'Padron de usuarios',
                                type: 'item',
                                url: '/sistema-comercial/dir-comercial/clientes/padron-usuarios'
                            }
                        ]
                },
                {
                    id: 'contratos',
                    title: 'Contratos',
                    type: 'collapsable',
                    icon: 'assignment',
                    children:
                        [
                            {
                                id: 'info-contratos',
                                title: 'Info contratos',
                                type: 'item',
                                url: '/sistema-comercial/dir-comercial/contratos/info-contratos'
                            }
                        ]
                },
                {
                    id: 'carteraVencida',
                    title: 'Cartera vencida',
                    type: 'collapsable',
                    icon: 'money',
                    children: []
                },
                {
                    id: 'infoFact',
                    title: 'Informatica y facturacion',
                    type: 'collapsable',
                    icon: 'dvr',
                    children: []
                }
            ]
    };


