import { Component, OnInit, ViewChild } from '@angular/core';
import { ImageService } from './image.service';
import { Observable } from 'rxjs';
import { BlogImage } from '../../model/blog-Image.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-image-selector',
  templateUrl: './image-selector.component.html',
  styleUrls: ['./image-selector.component.css']
})
export class ImageSelectorComponent implements OnInit{


  file?: File;
  fileName: string ='';
  title: string ='';
  previewUrl: string = '';
  image$?:  Observable<BlogImage[]>;

  @ViewChild('form', {static:false}) imageUploadForm?: NgForm;

  constructor(private imageService: ImageService){
    
  }


  ngOnInit(): void {
   this.getImages();
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
            this.imageUploadForm?.resetForm();
            this.getImages();
          }
        });
    }
  }


  selectimage(image : BlogImage): void {
    this.imageService.selectimage(image);

  }


  private getImages(){
    this.image$ = this.imageService.getAllImage();
  }





}  
