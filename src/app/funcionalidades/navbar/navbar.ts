import { Component, computed, signal, Output, EventEmitter, Input, OnInit, OnChanges } from '@angular/core';
import { ConnectedPosition, OverlayModule } from '@angular/cdk/overlay';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, map, startWith } from 'rxjs';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [OverlayModule, ReactiveFormsModule, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit, OnChanges {
  @Output() objectSelected = new EventEmitter<string>();

  @Input() list: any[] = [];
  private _originalList: any[] = [];
  filteredList = signal<any[]>([]);
  isOpen = signal(false);

  autoCompleteControl = new FormControl('');

  autoCompleteValueChanges = toSignal<string>(
    this.autoCompleteControl.valueChanges.pipe(
      startWith(''),
      debounceTime(200),
      distinctUntilChanged(),
      map((value) => value || '')
    )
  );




  position: ConnectedPosition[] = [
    {
      originX: 'start',
      originY: 'bottom',
      overlayX: 'start',
      overlayY: 'top',
      offsetY: 5
    }
  ];

  ngOnInit() {
    // Configurar el filtrado reactivo
    this.autoCompleteControl.valueChanges
      .pipe(
        startWith(''),
        debounceTime(200),
        distinctUntilChanged()
      )
      .subscribe(searchText => {
        this.filterItems(searchText || '');
      });
  }

  ngOnChanges() {
    if (this.list) {
      this._originalList = [...this.list];
      this.filterItems(this.autoCompleteControl.value || '');
    }
  }

  filterItems(searchText: string) {
    if (!searchText) {
      this.filteredList.set([...this._originalList]);
      return;
    }
    
    const searchLower = searchText.toLowerCase();
    const filtered = this._originalList.filter(item => {
      // Buscar en el nombre de usuario principal
      if (item.username.toLowerCase().includes(searchLower)) {
        return true;
      }
      
      // Buscar en otras propiedades si existen en el objeto original
      if (item.original) {
        // Verificar en campos adicionales como descripción, código, etc.
        const additionalFields = ['descripcion', 'codigo', 'nombre', 'id'];
        for (const field of additionalFields) {
          if (item.original[field] && 
              String(item.original[field]).toLowerCase().includes(searchLower)) {
            return true;
          }
        }
      }
      
      return false;
    });
    
    this.filteredList.set(filtered);
  }

  handleFocus() {
    this.isOpen.set(true);
    this.filterItems(this.autoCompleteControl.value || '');
  }

  handleBlur() {
    setTimeout(() => {
      this.isOpen.set(false);
    }, 200);
  }

  selectUser(object: any) {
    this.autoCompleteControl.setValue(object.username);
    this.isOpen.set(false);
    this.objectSelected.emit(object); // Emitimos el objeto completo al padre
  }
}