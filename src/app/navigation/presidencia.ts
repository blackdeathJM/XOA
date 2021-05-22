import {FuseNavigation} from '@plantilla/types';

export const PRESIDENCIA: FuseNavigation =
    {
        id: 'presidencia',
        title: 'Presidencia',
        type: 'group',
        icon: 'flare',
        children:
            [
                {
                    id: 'documentosExt',
                    title: 'Documentos',
                    icon: 'casino',
                    type: 'collapsable',
                    children:
                        [
                            {
                                id: 'documentos',
                                title: 'Documentos',
                                type: 'item',
                                url: '/sistema-comercial/presidencia/direccion/documentos/admon-docs'
                            },
                        ]
                },
                {
                    id: 'subRhh',
                    title: 'Recursos humanos',
                    type: 'collapsable',
                    icon: 'block',
                    children: []
                },
                {
                    id: 'comunicacionSocial',
                    title: 'Comunicacion social',
                    type: 'collapsable',
                    icon: 'block',
                    children: []
                },
                {
                    id: 'culturaAgua',
                    title: 'Cultura del agua',
                    type: 'collapsable',
                    icon: 'block',
                    children: []
                },
                {
                    id: 'organoInterno',
                    title: 'Organo interno ctrl',
                    type: 'collapsable',
                    icon: 'block',
                    children: []
                },
                {
                    id: 'teleAutomatizacion',
                    title: 'telemetria',
                    type: 'collapsable',
                    icon: 'device_hub',
                    children:
                        [
                            {
                                id: 'infoGral',
                                title: 'Info Gral',
                                type: 'item',
                                url: '/sistema-comercial/presidencia/telemetria/info-gral'
                            },
                            {
                                id: 'instalaciones',
                                title: 'instalaciones',
                                type: 'item',
                                url: '/sistema-comercial/presidencia/telemetria/instalaciones'
                            },
                            {
                                id: 'motorBomba',
                                title: 'Motores y Bombas',
                                type: 'item',
                                url: '/sistema-comercial/presidencia/telemetria/motores-bombas'
                            },
                            {
                                id: 'infoIps',
                                title: 'Info ips',
                                type: 'item',
                                url: '/sistema-comercial/presidencia/telemetria/info-ips'
                            },
                            {
                                id: 'lecturasParametros',
                                title: 'Lect param elect',
                                type: 'item',
                                url: '/sistema-comercial/presidencia/telemetria/lecturas-parametros'
                            },
                            {
                                id: 'lecturasMediciones',
                                title: 'Lect mediciones',
                                type: 'item',
                                url: '/sistema-comercial/presidencia/telemetria/lecturas-mediciones'
                            },
                            {
                                id: 'recibosCfe',
                                title: 'CFE',
                                type: 'item',
                                url: '/sistema-comercial/presidencia/telemetria/cfe'
                            },
                            {
                                id: 'comparativasTelemetria',
                                title: 'Comparativas',
                                type: 'item',
                                url: '/sistema-comercial/presidencia/telemetria/comparativas'
                            },
                            {
                                id: 'ordenTrabajoTele',
                                title: 'Ordenes de trabajo',
                                type: 'item',
                                url: '/sistema-comercial/presidencia/telemetria/ordenes-tele'
                            }
                        ]
                }
            ]
    };

