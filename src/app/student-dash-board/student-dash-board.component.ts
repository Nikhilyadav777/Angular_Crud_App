import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-student-dash-board',
  templateUrl: './student-dash-board.component.html',
  styleUrls: ['./student-dash-board.component.css']
})
export class StudentDashBoardComponent implements OnInit {

  formValue! : FormGroup;
  studentModuleObj: studentModel = new studentModel();
  studentData! : any;
  showAdd!:boolean;
  showUpdate!:boolean;

  constructor(private formbuilder: FormBuilder,private api:ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      Name:  [''],
      Email: [''],
      Mobile:[''],
      Fees:  ['']
    })
    this.getAllstudents()
  }
 clickAddStudents(){
   this.formValue.reset()
   this.showAdd = true;
   this.showUpdate = false;
 }
 postStudentDetails(){
  this.studentModuleObj.Name = this.formValue.value.Name;
  this.studentModuleObj.Email = this.formValue.value.Email;
  this.studentModuleObj.Mobile = this.formValue.value.Mobile;
  this.studentModuleObj.Fees = this.formValue.value.Fees;

  this.api.postStudents(this.studentModuleObj).subscribe(res=>{
    console.log(res);
    alert("Student Record Added Successfull");
    let ref = document.getElementById("cancel")
    ref?.click();
    this.formValue.reset();
    this.getAllstudents() //For update data

  },
  err=>{
    alert("Something Went Wrong, Please Fill Valid Detail")
  })
 }

 getAllstudents(){   // GetApi Done
  this.api.getStudents().subscribe(res=>{
    this.studentData = res;
  })
 }
 deleteStudents(stu:any){
  this.api.deleteStudent(stu.id).subscribe(res=>{
    alert("Student Record Deleted SuccessFull")
    this.getAllstudents()
  })
 }
 onEdit(stu:any){
  this.showAdd = false;
  this.showUpdate = true;
  this.studentModuleObj.id = stu.id;
  this.formValue.controls['Name'].setValue(stu.Name);
  this.formValue.controls['Email'].setValue(stu.Email);
  this.formValue.controls['Mobile'].setValue(stu.Mobile);
  this.formValue.controls['Fees'].setValue(stu.Fees);
 }
 updateStudentDetails(){
  this.studentModuleObj.Name = this.formValue.value.Name;
  this.studentModuleObj.Email = this.formValue.value.Email;
  this.studentModuleObj.Mobile = this.formValue.value.Mobile;
  this.studentModuleObj.Fees = this.formValue.value.Fees;

  this.api.updateStudents(this.studentModuleObj, this.studentModuleObj.id).subscribe(res=>{
    alert("Student Record Update Successfull");
    let ref = document.getElementById("cancel")
    ref?.click();
    this.formValue.reset();
    this.getAllstudents(); // For instance update Data
  })
 }

}
export class studentModel{
  id: number = 0;
  Name:string = '';
  Email:string = '';
  Mobile:string = '';
  Fees:string = '';

}
// json-server --watch db.json = command for start json server