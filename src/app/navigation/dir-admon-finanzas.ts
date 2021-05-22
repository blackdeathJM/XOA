import {FuseNavigation} from '@plantilla/types';

export const ADMON_FINANZAS: FuseNavigation =
    {
        id: 'dirAdmonFinanzas',
        title: 'Dir. admon y finanzas',
        type: 'group',
        children:
            [
                {
                    id: 'contabilidad',
                    title: 'Contabilidad',
                    icon: 'filter_b_and_w',
                    type: 'collapsable',
                    children:
                        [
                            {
                                id: 'ctrlPatrimonial',
                                title: 'Ctrl Patrimonial',
                                type: 'collapsable',
                                children:
                                    [
                                        {
                                            id: 'activos',
                                            title: 'Activos',
                                            type: 'item',
                                            url: '/sistema-comercial/admon-finanzas/contabilidad/ctrl-patrimonial/activos'
                                        },
                                        {
                                            id: 'docs',
                                            title: 'Documentos',
                                            type: 'item',
                                            url: '/sistema-comercial/admon-finanzas/contabilidad/ctrl-patrimonial/docs-usuario-activo'
                                        }
                                    ]
                            },
                            {
                                id: 'comprasServGrales',
                                title: 'Compras y serv grales',
                                type: 'collapsable',
                                children: []
                            },
                            {
                                id: 'almacen',
                                title: 'Almacen',
                                type: 'collapsable',
                                children: []
                            },
                        ]
                },
            ]
    };
