import { Component } from '@angular/core';
import { ImageService } from './image.service';

@Component({
  selector: 'app-image-selector',
  templateUrl: './image-selector.component.html',
  styleUrls: ['./image-selector.component.css']
})
export class ImageSelectorComponent {


  file?: File;
  fileName: string ='';
  title: string ='';
  previewUrl: string = '';

  constructor(private imageService: ImageService){

  }

  onFileUploadChange(event : Event): void {
    const element = event.currentTarget as HTMLInputElement;
    this.file = element.files?.[0];
  }

  uploadImage(): void {
    if (this.file && this.fileName.trim() !== '' && this.title.trim() !== '') {
      const trimmedFileName = this.fileName.trim();
      const trimmedTitle = this.title.trim();
  
      this.imageService.uploadImage(this.file, trimmedFileName, trimmedTitle)
        .subscribe({
          next: (response) => {
            console.log(response);
          }
        });
    }
  }
}  
