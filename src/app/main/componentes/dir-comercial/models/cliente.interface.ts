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

export interface IConvenioContrato
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
    calle: string;
    colonia: string;
    entreCalles: string;
    referencia: string;
    servSolicitado: string;
    medidorRef: string;
    tipoPredio: string;
    areaPredio: number;
    areaConstruida: number;
    almacenamiento: string;
    tarifa: string;
    MaterialArroyoDeCalle: string;
    MaterialAcera: string;
    comentarios: string;
    aprobadoServ: boolean;
    matArroyoCalle: string;
    matAcera: string;
    latitud: number;
    longitud: number;

    estado: string;
    ciudad: string;
    municipio: string;
    codigoPostal: string;
    rpu: string;
    noMedidor: string;
    noContrato: string;
    noCuenta: string;
    fechaAlta: string;
    sector: number;
    ruta: number;
    giro: string;
    zona: string;
    noPersonas: number;
    activo: boolean;
    esPrincipal: boolean;
    creadoPor: string;
    documentosImg: IDocumentacion;
    modificadoPor: IModificadaPor[];
    convenio: IConvenioContrato;
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
