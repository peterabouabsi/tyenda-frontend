import { Component, Input, OnInit } from '@angular/core';

//Environment
import { environment } from 'src/environments/environments';

//Map
import * as L from 'leaflet';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss']
})
export class MapViewComponent implements OnInit {

  @Input() lat: number = 0;
  @Input() lng: number = 0;
  @Input() zoomControlVisible?: boolean = true;

  public map: L.Map;

  private marker: L.Marker;
  private markers: L.Marker[] = [];

  myIcon = L.icon({
    iconUrl: './assets/Svg/map-location.svg',
    iconSize: [23, 30],
    popupAnchor: [-3, -76],
  });

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.init();
  }

  ngOnDestroy(): void {
    this.map.remove();
  }

  init() {
    this.initMap(this.lat, this.lng);
  }
  initMap(lat: number, lng: number) {
    this.map = L.map('map-view', {
      center: [lat, lng],
      zoom: 10,
      zoomControl: this.zoomControlVisible,
      attributionControl: false
    });
    this.marker = new L.Marker([lat, lng], {icon: this.myIcon}).addTo(this.map);

    this.initTiles();
  }
  initTiles() {
    const tiles = L.tileLayer(environment.mapTile, {
      maxZoom: 18,
      minZoom: 3
    });

    tiles.addTo(this.map);
  }

  public updateMarkerPosition() {
    if (this.marker && this.map) {
      const newLatLng = L.latLng(this.lat, this.lng);
      this.marker.setLatLng(newLatLng);
      this.map.panTo(newLatLng);
    }
  }

}
