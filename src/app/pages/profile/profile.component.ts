import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { FormControl,FormsModule, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { FileUploadModule } from 'primeng/fileupload';
import { MenuModule } from 'primeng/menu';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MenuItem } from 'primeng/api';
interface Country {
  name: string;
  code: string;
  population: number;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule , DropdownModule ,ReactiveFormsModule,
     InputTextModule, RadioButtonModule , CalendarModule,
      FileUploadModule, MenuModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})


export class ProfileComponent {
  fromSubmitted = false;
  items?:MenuItem[];
  fNameValMsg="min length of first name is 3 litters";
  lNameValMsg="min length of last name is 3 litters";
  emailValMsg = "email invalid";
  selectedCountry: Country ={ name: 'United States', code: 'US', population: 331002651 } ;
  countries: Country[] = [
    { name: 'United States', code: 'US', population: 331002651 },
    { name: 'India', code: 'IN', population: 1380004385 }];
  value: any;
  imgSrc:string = '';
  profileForm = new FormGroup({
    fName:new FormControl(null,[Validators.required, Validators.minLength(3)]),
    lName:new FormControl(null,[Validators.required, Validators.minLength(3)]),
    email:new FormControl(null,[Validators.required, Validators.email]),
    address:new FormControl(null,[Validators.required, Validators.minLength(20)]),

  })

  get isfirstNameValid(){    
    return this.profileForm.controls.fName.valid
  }
  

  get isLastNameValid(){
    
    return this.profileForm.controls.lName.valid
  }

 
  get isEmailValid(){
    return this.profileForm.controls.email.valid
  }

  

  get isSubmitted(){
    return this.fromSubmitted;
  }


  get firstNameValChanged() {
    return this.profileForm.controls.fName.dirty;
  }

  get lastNameValChanged() {
    
    return this.profileForm.controls.lName.dirty;
  }
  
  get emailValChanged() {
    return this.profileForm.controls.email.dirty;

  }
  

  submitProfileData(){
    this.fromSubmitted = true;
    if(this.profileForm.valid){
      console.log(this.profileForm);
      this.profileForm.reset();
      this.fromSubmitted = false;              
    }
    else {
      console.log('invalid')
      if(!this.profileForm.controls.fName.valid) console.log(this.fNameValMsg)
      if(!this.profileForm.controls.lName.valid) console.log(this.lNameValMsg)
      if(!this.profileForm.controls.email.valid) console.log(this.emailValMsg)
    }

}


onUpload(event:any) {
  // console.log("onUpload()")
  // console.log(event);
  // console.log( event.files[0].name);

  let reader = new FileReader();
      reader.readAsDataURL(event.files[0]);
      reader.onload = (event: any) => {
        this.imgSrc = event.target.result;
      };

  // console.log(decodeURIComponent(event.files[0].name));
  // console.log(event.target.files[0])
  // const file = event.files;
  // console.log(file)

  // if(file.url)
  //   console.log(file.url)
}

// onFileUpload(event:any) {
//   console.log("onFileUpload()")
//   console.log(event)

// }


ngOnInit(){

  this.items = [
    {
      label: "Profile",
      icon: "pi pi-fw pi-user",
    },
    {
      label: "Security",
      icon: "pi pi-fw pi-lock",
    },
    {
      label: "Orders",
      icon: "pi pi-fw pi-bars",

    },
    {
      label: "Wishlists",
      icon: "pi pi-fw pi-heart",
    },
    {
      label: "Returns",
      icon: "pi pi-fw pi-spinner",
    },
];

}

}
