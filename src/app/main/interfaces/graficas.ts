export interface IDatasets
{
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
    borderWidth: number;
    hoverBackgroundColor: string;
}

export interface IGraficaC
{
    label: string[];
    datasets: IDatasets[];
}
