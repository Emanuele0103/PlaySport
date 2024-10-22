import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Definizione delle interfacce per riflettere la struttura del backend
export interface ResourceType {
  id: number;
  name: string;
}

export interface Resource {
  id: number;
  resourceName: string;
  address: string;
  resourceType: ResourceType;
  resourceOwnerName: string;
  deleted: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  private resourceUrl = 'http://localhost:9090/api/v1/resource';
  
  constructor(private http: HttpClient) { }

  // Funzione per ottenere tutte le risorse dal server
  getFields(): Observable<Resource[]> {
    return this.http.get<Resource[]>(this.resourceUrl + "/resources");
  }
}
