import {FuseNavigation} from '@plantilla/types';

export const RURAL: FuseNavigation =
    {
        id: 'dirRural',
        title: 'Dir. Rural',
        type: 'group',
        children:
            [
                {
                    id: 'financieroRural',
                    title: 'Financiero rural',
                    type: 'collapsable',
                    icon: 'block',
                    children:
                        []
                },
                {
                    id: 'tecnicoRural',
                    title: 'Tecnico rural',
                    type: 'collapsable',
                    icon: 'block',
                    children:
                        []
                },
                {
                    id: 'operativoRural',
                    title: 'Operativo rural',
                    type: 'collapsable',
                    icon: 'block',
                    children:
                        []
                }
            ]
    };
