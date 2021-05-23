export interface IDocumentacion
{
    ineFrente: string;
    ineTrasera: string;
    predial: string;
    curp: string;
}

export interface IModificadaPor
{
    usuario: string;
    fechaHora: string;
    comentario: string;
}

export interface IDatosFacturacion
{
    nombre: string;
    calle: string;
    colonia: string;
    rfc: string;
    rpuAFacturar: string[];
}

export interface IConveniosContratos
{
    folioConvenio: string;
    calle: string;
    colonia: string;
    cp: string;
    fechaConvenio: string;
    fechaTerminoConvenio: string;
    comentarios: string;
}

export interface IContrato
{
    rpu: string;
    noMedidor: string;
    noContrato: string;
    noCuenta: string;
    fechaAlta: string;
    calle: string;
    entreCalles: string;
    referencia: string;
    estado: string;
    ciudad: string;
    municipio: string;
    colonia: string;
    codigoPostal: string;
    sector: number;
    ruta: number;
    tarifa: string;
    giro: string;
    zona: string;
    noPersonas: number;
    activo: boolean;
    documentosImg: IDocumentacion;
    creadoPor: string;
    modificadoPor: IModificadaPor[];
    convenio: IConveniosContratos;
}

export interface ICliente
{
    _id: string;
    nombreCompleto: string;
    telefonos: string[];
    contratos: IContrato[];
    datosDeFacturacion: IDatosFacturacion[];
}

export interface IClienteMod
{
    esRegistro: boolean;
    datosCliente: ICliente;
}

export interface IResCliente
{
    estatus: boolean;
    mensaje: string;
    documento: ICliente;
    documentos: ICliente[];
}
