export interface IMedidor
{
    fechaInstalacion: string;
    fechaRetiro: string;
    medidor: string;
    recibos: Array<IRecibosCfe>;
    activa: boolean;
}

export interface IMedidorD
{
    _id: string;
    esEditar: boolean;
    medidor: IMedidor;
}

export interface IRecibosCfe
{
    dia: number;
    mes: number;
    ano: number;
    costoKw: number;
    pago: number;
    lectura: number;
    imgRecibo: string;
}

export interface IReciboCfeD
{
    _id: string;
    medidor: IMedidor;
}
