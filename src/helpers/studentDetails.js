const studentDataBase = {
    "19103089": {name:"Arnav Khare","studentType":1},
    "19103076": {name: "Gaurav Km Jaiswal", "studentType": 1 },
    "19103083": { name: "Yash Sharma", "studentType": 0 },
    "19102080": { name: "Devansh Nigam", "studentType": 1 },
    "19102186": { name: "Nikhil Verma", "studentType": 0 },
    "9919103073": { name: "Anshul Yadav", "studentType": 0 }
}

export function studentDetails(enrollmentNumber) {
    if(studentDataBase.hasOwnProperty(enrollmentNumber)){
        return studentDataBase[enrollmentNumber]
    }else{
        return -1
    }
}