import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Back } from '../models/back.model';
import { Project } from '../models/project.model'
import { Observable } from "rxjs";
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  projects: Project[] = [];
  userProjects: Project[] = []
  subProject = new Subject<{ pro: Project[] }>();

  subProjectUser = new Subject<Project[]>();

  constructor(private http: HttpClient, private router: Router) { }

  addProject(nomProjet: string, description: string, prix: string, image: File) {

    const fd = new FormData();

    fd.append('Image', image);
    fd.append('nomProjet', nomProjet);
    fd.append('description', description);
    fd.append('prix', prix);
    fd.append('userId', JSON.parse(localStorage.getItem('user')).id)


    this.http.post<Project>(Back.projectUrl + '/', fd).subscribe((res) => {
      //console.log('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee')
      console.log(res)
      this.userProjects.push(res);
      this.subProjectUser.next([...this.userProjects]);
    })
  }

  getProjects() {

    return this.http.get<{ pro: Project[] }>(Back.projectUrl + '/getAll/').subscribe((res) => {


      this.projects = res.pro;

      this.subProject.next({ pro: [...this.projects] });
    });
  }

  projectsub() {
    return this.subProject.asObservable()
  }

  // get User's projects
  getUserProjects() {
    const userId = JSON.parse(localStorage.getItem('user')).id;
    //console.log(Back.projectUrl+`/getAllUP/${userId}`)
    this.http.get<{ proj: Project[] }>(Back.projectUrl + `/getAllUP/${userId}`).subscribe((res) => {
      this.userProjects = res.proj;
      this.subProjectUser.next([...this.userProjects]);
    })
  }

  projectUsub() {
    return this.subProjectUser.asObservable()
  }

  getAllProjects() {

    return this.http.get<any>(Back.projectUrl + '/getAll/');

  }




  //   updateProject(id: number, project: Project): Observable<Project> {
  //     return this.http.post<any>(Back.projectUrl+'/updateProject'+id, project);
  // }

}
