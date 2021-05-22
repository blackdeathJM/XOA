import {FuseNavigation} from '@plantilla/types';

export const GLOBAL: FuseNavigation =
    {
        id: 'global',
        title: 'Global',
        type: 'group',
        icon: 'archive',
        children:
            [
                {
                    id: 'globalitems',
                    title: 'Global',
                    icon: 'apps',
                    type: 'collapsable',
                    children:
                        [
                            {
                                id: 'departamento',
                                title: 'Departamentos',
                                type: 'item',
                                url: '/sistema-comercial/global/deptos/departamentos'
                            }
                        ]
                }
            ]
    };
