export class User {
    fname?: string;
    lname?: string; 
    email?: string;
    phonenumber?: string;
    dob?: string; 
    addressLine?: string; 
    city?: string;
    state?: string; 
    postalCode?: string; 
    gradeOrYearLevel?: string; 
    gpaScore?: string;
    gwaPercentile?: string;
    expectedGraduationDate?: string; 
    schoolName?: string; 
    department?: string; 
    password?: string;
    resetPasswordToken?: string; 
    tokenExpiry?: string;

    constructor(data?: Partial<User>) {
        if (data) {
            this.fname = data.fname || '';
            this.lname = data.lname;
            this.email = data.email || '';
            this.phonenumber = data.phonenumber || '';
            this.dob = data.dob || ''; 
            this.addressLine = data.addressLine;
            this.city = data.city;
            this.state = data.state;
            this.postalCode = data.postalCode;
            this.gradeOrYearLevel = data.gradeOrYearLevel;
            this.gpaScore = data.gpaScore || '';
            this.gwaPercentile = data.gwaPercentile || '';
            this.expectedGraduationDate = data.expectedGraduationDate || ''; 
            this.schoolName = data.schoolName;
            this.department = data.department;
            this.password = data.password || '';
            this.resetPasswordToken = data.resetPasswordToken;
            this.tokenExpiry = data.tokenExpiry || ''; 
        }
    }
}
