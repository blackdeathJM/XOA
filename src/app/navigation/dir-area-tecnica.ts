import {FuseNavigation} from '@plantilla/types';

export const AREA_TECNICA: FuseNavigation =
    {
        id: 'dirAreaTecnica',
        title: 'Dir. area tecnica',
        type: 'group',
        children:
            [
                {
                    id: 'subOperacion',
                    title: 'Sub Operacion',
                    type: 'collapsable',
                    icon: 'block',
                    children:
                        [
                            {
                                id: 'ordenesTrabajoDeptos',
                                title: 'Ordenes de trabajo',
                                type: 'item',
                                url: '/sistema-comercial/global/ordenes-trabajo'
                            }
                        ]
                },
                {
                    id: 'subAmplYConstruccion',
                    title: 'Ampleacion y construccion',
                    type: 'collapsable',
                    icon: 'block',
                    children:
                        []
                }
            ]
    };

