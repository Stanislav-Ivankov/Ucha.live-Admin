import { Component, Input } from '@angular/core';
import { CameraCheckService } from '../../core/services/camera-check.service';

declare const videojs;

@Component({
    selector: 'app-video',
    templateUrl: './video.component.html',
    styleUrls: ['./video.component.scss']
})

export class VideoComponent {
    @Input('visibleCamera') set visibleCamera(value) {
        if(value !== null) {
            this.hide = true;
            this.cameraLink = value;
            this.cameraCheckService.getCameraById(this.cameraLink).then((camera) => {
                this.hide = false;
                this.video = new Date();
                this.initVideo(camera);
            })
        }
    }

    cameraLink;
    hide = false;
    video = new Date();

    constructor(
        private cameraCheckService: CameraCheckService
    ) {}
    
    initVideo(camera) {
        setTimeout(() => {
			const sourceEl = document.createElement("source");
            sourceEl.type = 'application/x-mpegURL';
            sourceEl.src = `http://jilanov.com:5200/streams/${camera._id}/index.m3u8`;
			document.getElementsByTagName('video-js')[0].appendChild(sourceEl);
            videojs('v' + +this.video);
        }, 100)
    }
}