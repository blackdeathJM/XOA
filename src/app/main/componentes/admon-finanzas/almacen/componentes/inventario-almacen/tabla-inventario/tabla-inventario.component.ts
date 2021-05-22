import {Component, Input, OnInit} from '@angular/core';
import {ITablaColumnas} from '../../../../../../interfaces/paginacion-interface';

@Component({
  selector: 'app-tabla-inventario',
  templateUrl: './tabla-inventario.component.html',
  styleUrls: ['./tabla-inventario.component.scss']
})
export class TablaInventarioComponent implements OnInit {

  constructor() { }
  @Input() columnas: ITablaColumnas[];
  ngOnInit(): void {
  }

}
