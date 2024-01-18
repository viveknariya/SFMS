import { Routes } from '@angular/router';
import { StudentComponent } from './student/student.component';
import { StudentListComponent } from './student/student-list/student-list.component';
import { AddStudentComponent } from './student/add-student/add-student.component';
import { EditStudentPersonalComponent } from './student/edit-student/edit-student-personal/edit-student-personal.component';
import { EditStudentComponent } from './student/edit-student/edit-student.component';
import { FeeStructureComponent } from './fee/fee-structure/fee-structure.component';
import { FeeTransectionComponent } from './fee/fee-transection/fee-transection.component';
import { FeeComponent } from './fee/fee.component';
import { FeeAnalyticsComponent } from './fee/fee-analytics/fee-analytics.component';
import { StudentFeeComponent } from './student/student-fee/student-fee.component';
import { AddEditStudentFeeComponent } from './student/student-fee/add-edit-student-fee/add-edit-student-fee.component';

export const routes: Routes = [
    { path: '', redirectTo: 'student', pathMatch: 'full' },
    {
        path:"student",
        component:StudentComponent,
        children:[
            {path:"",redirectTo:"studentList",pathMatch:"full"},
            {path:"studentList",component:StudentListComponent},
            {
                path:"editStudent",
                component:EditStudentComponent,
                children:[
                    {path:"",redirectTo:"editPersonal",pathMatch:"full"},
                    {path:"editPersonal",component:EditStudentPersonalComponent},
                    {path:"studentFee",component:StudentFeeComponent},
                    {path:"addEditStudentFee",component:AddEditStudentFeeComponent},

                ]
            },
            {path:"addStudent",component:AddStudentComponent},
        ],
        
    },
    {
        path:"fee",
        component:FeeComponent,
        children:[
            {path:"",redirectTo:"feeAnalytics",pathMatch:"full"},
            {path:"feeAnalytics",component:FeeAnalyticsComponent},
            {path:"feeStructure",component:FeeStructureComponent},
            {path:"feeTransection",component:FeeTransectionComponent},
        ]
    },  
    

];
