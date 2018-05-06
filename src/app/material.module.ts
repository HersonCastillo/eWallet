import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { 
  MatButtonModule,
  MatToolbarModule,
  MatSidenavModule,
  MatInputModule,
  MatFormFieldModule,
  MatDividerModule,
  MatListModule,
  MatTabsModule,
  MatCardModule,
  MatChipsModule,
  MatDialogModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDividerModule,
    MatListModule,
    MatTabsModule,
    MatCardModule,
    MatChipsModule,
    MatDialogModule
  ],
  exports: [
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatInputModule,
    MatFormFieldModule,
    MatDividerModule,
    MatListModule,
    MatTabsModule,
    MatCardModule,
    MatChipsModule,
    MatDialogModule
  ],
  declarations: []
})
export class MaterialModule { }
