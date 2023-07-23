import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

//Environment
import { environment } from 'src/environments/environments';

//Map
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  @Input() mapId?: number = 0;
  @Input() lat: number = 0;
  @Input() lng: number = 0;

  @Output() mapLatitudeEvent = new EventEmitter();
  @Output() mapLongitudeEvent = new EventEmitter();

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
    if (this.map) {
      this.map.remove();
    }
  }

  init() {
    navigator.geolocation.getCurrentPosition(position => {
      this.initMap(position.coords.latitude, position.coords.longitude);
    },
    () => {
      this.initMap(this.lat, this.lng);
    });
  }
  initMap(lat: number, lng: number) {
    this.mapLatitudeEvent.emit(lat);
    this.mapLongitudeEvent.emit(lng);

    this.map = L.map('map'+this.mapId, {
      center: [lat, lng],
      zoom: 15,
      attributionControl: false
    });

    this.marker = new L.Marker([lat, lng], {icon: this.myIcon}).addTo(this.map);
    this.initTiles();

    //map events: onClick
    this.map.on('click', (event) => {
      if (this.marker) {
        this.map.removeLayer(this.marker);
      }
      this.marker = new L.Marker(event.latlng, {icon: this.myIcon}).addTo(this.map);
      this.mapLatitudeEvent.emit(this.marker.getLatLng().lat);
      this.mapLongitudeEvent.emit(this.marker.getLatLng().lng);
    })
  }
  initTiles() {
    const tiles = L.tileLayer(environment.mapTile, {
      maxZoom: 18,
      minZoom: 3
    });
    tiles.addTo(this.map);
  }

  public setOff(){
    this.map.remove();
  }
}
