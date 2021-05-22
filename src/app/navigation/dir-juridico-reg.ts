import {FuseNavigation} from '@plantilla/types';

export const JURIDICO: FuseNavigation =
    {
        id: 'dirJuridicaReg',
        title: 'Dir. Juridica y reg',
        type: 'group',
        children:
            [
                {
                    id: 'tics',
                    title: 'Tecnologias info',
                    type: 'collapsable',
                    icon: 'block',
                    children:
                        []
                },
                {
                    id: 'subTransparencia',
                    title: 'Transparencia',
                    type: 'collapsable',
                    icon: 'block',
                    children:
                        []
                },
                {
                    id: 'subArchivoGral',
                    title: 'Archivo Gral',
                    type: 'collapsable',
                    icon: 'block',
                    children:
                        []
                }
            ]
    };
