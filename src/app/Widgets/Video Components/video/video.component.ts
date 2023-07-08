import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit{

  @Input() src: string = "";
  @Input() poster: string = "";

  @ViewChild("video") video: ElementRef<HTMLVideoElement>;

  public onPlay: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  public play(){
    this.video.nativeElement.play();
    this.onPlay = true;
  }

}
