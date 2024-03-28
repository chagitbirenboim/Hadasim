import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { User } from '@app/_models/user';
import { Vaccine } from '@app/_models/vaccine';
import { Illnes } from '@app/_models/illnes';

@Injectable({ providedIn: 'root' })
export class UserService {
    private usersSubject = new BehaviorSubject<User[]>([]);
    users$ = this.usersSubject.asObservable();

    constructor(private http: HttpClient) { }

    getAll(): Observable<User[]> {
        return this.http.get<User[]>(`${environment.apiUrl}/`).pipe(
            tap(users => this.setUsers(users))
        );
    }
    addUser(formData: any): Observable<User> {
        let body
        if (!formData.vaccineDetails.manufacturer && !formData.startIllDate){
            body = {
                user: {
                    identityNum: formData.identityNum, firstName: formData.firstName,
                    lastName: formData.lastName, city: formData.city, street: formData.street,
                    numHouse: formData.numHouse, phone: formData.phone,
                    mobilePhone: formData.mobilePhone, dateBirth: formData.birthDate
                }
            }
        }
        else if (!formData.vaccineDetails.manufacturer && formData.startIllDate){
            body = {
                user: {
                    identityNum: formData.identityNum, firstName: formData.firstName,
                    lastName: formData.lastName, city: formData.city, street: formData.street,
                    numHouse: formData.numHouse, phone: formData.phone,
                    mobilePhone: formData.mobilePhone, dateBirth: formData.birthDate
                },
                illness: { illnessDate: formData.startIllDate, recoveryDate: formData.endIllDate ? formData.endIllDate : null },
            }
        }
        else if(formData.vaccineDetails.manufacturer && !formData.startIllDate){
            body = {
                user: {
                    identityNum: formData.identityNum, firstName: formData.firstName,
                    lastName: formData.lastName, city: formData.city, street: formData.street,
                    numHouse: formData.numHouse, phone: formData.phone,
                    mobilePhone: formData.mobilePhone, dateBirth: formData.birthDate
                },
                vaccine: formData.vaccineDetails,
            }
        }
        else{
            body =  {
                user: {
                    identityNum: formData.identityNum, firstName: formData.firstName,
                    lastName: formData.lastName, city: formData.city, street: formData.street,
                    numHouse: formData.numHouse, phone: formData.phone,
                    mobilePhone: formData.mobilePhone, dateBirth: formData.birthDate
                },
                illness: { illnessDate: formData.startIllDate, recoveryDate: formData.endIllDate ? formData.endIllDate : null },
                vaccine: formData.vaccineDetails,
            } 
        }
        return this.http.post<User>(`${environment.apiUrl}/users`, body, {
            headers: { 'Content-Type': 'application/json' }
        }).pipe(
            tap(addedUser => {
                const currentUsers = this.usersSubject.getValue();
                const updatedUsers = [...currentUsers, addedUser];
                this.usersSubject.next(updatedUsers);
            })
        );
    }

    deleteUser(id: any): Observable<any> {
        return this.http.delete<any>(`${environment.apiUrl}/users/${id}`).pipe(
            tap(data => {
                const currentUsers = this.usersSubject.getValue();
                const updatedUsers = currentUsers.filter(user => user._id !== id);
                this.usersSubject.next(updatedUsers);
            })
        );
    }

    updateUser(user: User) {
        return this.http.post<User>(`${environment.apiUrl}/users/${user._id}`, user).pipe(
            tap(updatedUser => {
                const currentUsers = this.usersSubject.getValue();
                const index = currentUsers.findIndex(u => u._id === user._id);
                if (index !== -1) {
                    const updatedUsers = [...currentUsers];
                    updatedUsers[index] = updatedUser;
                    this.usersSubject.next(updatedUsers);
                }
            })
        );
    }

    updateIlness(illnes: Illnes) {
        return this.http.post<Illnes>(`${environment.apiUrl}/illnes/${illnes.user}`, illnes)
    }

    getUserById(id: string): Observable<User> {
        return this.http.get<User>(`${environment.apiUrl}/users/${id}`)
    }
    getVaccineByIdUser(user_id: string): Observable<Vaccine> {
        return this.http.get<Vaccine>(`${environment.apiUrl}/vaccines/${user_id}`)
    }
    getIllnessByIdUser(user_id: string): Observable<Illnes> {
        return this.http.get<Illnes>(`${environment.apiUrl}/illnes/${user_id}`)
    }
    setUsers(users: User[]) {
        this.usersSubject.next(users);
    }
    addVaccine(formData: any) {
        return this.http.post<Vaccine>(`${environment.apiUrl}/vaccines/${formData.user_id}`, {user_id:formData.user_id,vaccine:formData.vaccine})
    }
}