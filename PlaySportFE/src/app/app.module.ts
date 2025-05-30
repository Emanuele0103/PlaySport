import { NgModule, LOCALE_ID } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Moduli core Angular
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withFetch } from '@angular/common/http';

// Componenti del progetto
import { HomeComponent } from './home/home.component';
import { SettingsComponent } from './settings/settings.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { ClubDetailsComponent } from './club-details/club-details.component';
import { UserBookingsComponent } from './user-booking/user-booking.component';

// Modulo di autenticazione
import { AuthModule } from './auth/auth.module';

// Angular Material
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MY_DATE_FORMATS } from './shared/date-format';

// Locale italiano
import { registerLocaleData } from '@angular/common';
import localeIt from '@angular/common/locales/it';
import { OwnerStructuresComponent } from './owner-structures/owner-structures.component';
registerLocaleData(localeIt);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SettingsComponent,
    UserManagementComponent,
    ClubDetailsComponent,
    UserBookingsComponent,
    OwnerStructuresComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    AppRoutingModule,
    AuthModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch()),
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    { provide: LOCALE_ID, useValue: 'it-IT' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
