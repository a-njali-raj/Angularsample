export class User {
    fname?: string;
    lname?: string; // optional field
    email?: string;
    phonenumber?: string;
    dob?: string; // Changed to string
    addressLine?: string; // optional field
    city?: string; // optional field
    state?: string; // optional field
    postalCode?: string; // optional field
    gradeOrYearLevel?: string; // optional field
    gpaScore?: string;
    gwaPercentile?: string;
    expectedGraduationDate?: string; // Changed to string
    schoolName?: string; // optional field
    department?: string; // optional field
    password?: string;
    resetPasswordToken?: string; // optional field
    tokenExpiry?: string; // Changed to string

    constructor(data?: Partial<User>) {
        if (data) {
            this.fname = data.fname || '';
            this.lname = data.lname;
            this.email = data.email || '';
            this.phonenumber = data.phonenumber || '';
            this.dob = data.dob || ''; // Ensure date is a string
            this.addressLine = data.addressLine;
            this.city = data.city;
            this.state = data.state;
            this.postalCode = data.postalCode;
            this.gradeOrYearLevel = data.gradeOrYearLevel;
            this.gpaScore = data.gpaScore || '';
            this.gwaPercentile = data.gwaPercentile || '';
            this.expectedGraduationDate = data.expectedGraduationDate || ''; // Ensure date is a string
            this.schoolName = data.schoolName;
            this.department = data.department;
            this.password = data.password || '';
            this.resetPasswordToken = data.resetPasswordToken;
            this.tokenExpiry = data.tokenExpiry || ''; // Ensure date is a string
        }
    }
}
