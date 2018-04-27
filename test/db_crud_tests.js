var expect = require('chai').expect;
var db = require('../models/SISdb')

/*
Performing Create Read Update and Delete operations on 
each of the tables in the database
*/
describe('Database CRUD tests', function() {

	/*
	AcademicStaff table
	*/
    describe('AcademicStaff', function() {
        it('Create', function(done) {
            sql = "INSERT INTO AcademicStaff (Username,FirstName,LastName,Email)" +
                " VALUES ('firstname.lastname','firstname','lastname','firstname@lastname.com')";
            db.query(sql, function(err, result) {
            	if (err) throw err;
                expect(err).to.be.a('null');
                done();
            });
        });
        it('Read', function(done) {
            sql = "SELECT * FROM AcademicStaff"+
            " WHERE id=(SELECT MAX(id) FROM AcademicStaff)"; //Most recent entry
            db.query(sql, function(err, result) {
            	if (err) throw err;
                expect(result[0]['Username']).equal("firstname.lastname");
                done();
            });
        });
        it('Update', function(done) {
        	//Get the ID first
            sql = "SELECT id FROM AcademicStaff"+
            " WHERE id=(SELECT MAX(id) FROM AcademicStaff)"; //Most recent entry
            db.query(sql, function(err, result) {
            	if (err) throw err;
            	id = result[0]['id'];
            	sql = "UPDATE AcademicStaff" +
            		" SET username='firstname.lastname123'"+
            		" WHERE id="+id;
            	db.query(sql, function(err, result) {
            		if (err) throw err;
                	expect(err).to.be.a('null');
               	 	done();
            	});
            });
        });
        it('Delete', function(done) {
        	//Get the ID first
            sql = "SELECT id FROM AcademicStaff"+
            " WHERE id=(SELECT MAX(id) FROM AcademicStaff)"; //Most recent entry
            db.query(sql, function(err, result) {
            	if (err) throw err;
            	id = result[0]['id'];
            	sql = "DELETE FROM AcademicStaff"+
        		" WHERE id="+id;
            	db.query(sql, function(err, result) {
            		if (err) throw err;
            		expect(result.affectedRows).equal(1);
                	done();
            	});
            });
        });
    });

	/*
	Course table
	*/
    describe('Course', function() {
        it('Create', function(done) {
            sql = "INSERT INTO Course (CourseName, Duration, Qualification)" +
                " VALUES ('Some Science','3','BSc')";
            db.query(sql, function(err, result) {
            	if (err) throw err;
                expect(err).to.be.a('null');
                done();
            });
        });
        it('Read', function(done) {
            sql = "SELECT * FROM Course"+
            " WHERE id=(SELECT MAX(id) FROM Course)"; //Most recent entry
            db.query(sql, function(err, result) {
            	if (err) throw err;
                expect(result[0]['CourseName']).equal("Some Science");
                done();
            });
        });
        it('Update', function(done) {
        	//Get the ID first
            sql = "SELECT id FROM Course"+
            " WHERE id=(SELECT MAX(id) FROM Course)"; //Most recent entry
            db.query(sql, function(err, result) {
            	if (err) throw err;
            	id = result[0]['id'];
            	sql = "UPDATE Course" +
            		" SET CourseName='Some Other Science'"+
            		" WHERE id="+id;
            	db.query(sql, function(err, result) {
            		if (err) throw err;
                	expect(result.affectedRows).equal(1);
               	 	done();
            	});
            });
        });
        it('Delete', function(done) {
        	//Get the ID first
            sql = "SELECT id FROM Course"+
            " WHERE id=(SELECT MAX(id) FROM Course)"; //Most recent entry
            db.query(sql, function(err, result) {
            	if (err) throw err;
            	id = result[0]['id'];
            	sql = "DELETE FROM Course"+
        		" WHERE id="+id;
            	db.query(sql, function(err, result) {
            		if (err) throw err;
            		expect(result.affectedRows).equal(1);
                	done();
            	});
            });
        });
    });

	/*
	Student table
	*/
    describe('Student', function() {
        it('Create', function(done) {
            sql = "INSERT INTO Student (FirstName, LastName, Username, Gender, DateOfBirth, CountryOfOrigin, EntryYear, Level, CourseID, PersonalTutorID, RegistrationStatus)" +
                " VALUES ('SomeFirstName','SomeLastName','name14lastname','M','1995-01-01','UK','2014','3',1,1,'RE')";
            db.query(sql, function(err, result) {
            	if (err) throw err;
                expect(result.affectedRows).equal(1);
                done();
            });
        });
        it('Read', function(done) {
            sql = "SELECT * FROM Student"+
            " WHERE id=(SELECT MAX(id) FROM Student)"; //Most recent entry
            db.query(sql, function(err, result) {
            	if (err) throw err;
                expect(result[0]['Username']).equal("name14lastname");
                done();
            });
        });
        it('Update', function(done) {
        	//Get the ID first
            sql = "SELECT id FROM Student"+
            " WHERE id=(SELECT MAX(id) FROM Student)"; //Most recent entry
            db.query(sql, function(err, result) {
            	if (err) throw err;
            	id = result[0]['id'];
            	sql = "UPDATE Student" +
            		" SET username='name14otherLastName'"+
            		" WHERE id="+id;
            	db.query(sql, function(err, result) {
            		if (err) throw err;
                	expect(result.affectedRows).equal(1);
               	 	done();
            	});
            });
        });
        it('Delete', function(done) {
        	//Get the ID first
            sql = "SELECT id FROM Student"+
            " WHERE id=(SELECT MAX(id) FROM Student)"; //Most recent entry
            db.query(sql, function(err, result) {
            	if (err) throw err;
            	id = result[0]['id'];
            	sql = "DELETE FROM Student"+
        		" WHERE id="+id;
            	db.query(sql, function(err, result) {
            		if (err) throw err;
            		expect(result.affectedRows).equal(1);
                	done();
            	});
            });
        });
    });

	/*
	Module table
	*/
    describe('Module', function() {
        it('Create', function(done) {
            sql = "INSERT INTO Module (ModuleCode, ModuleName, Description, NumberOfCredits, Semester)" +
                " VALUES ('MODULE123','Some Module','n/a',10,'1')";
            db.query(sql, function(err, result) {
            	if (err) throw err;
                expect(result.affectedRows).equal(1);
                done();
            });
        });
        it('Read', function(done) {
            sql = "SELECT * FROM Module"+
            " WHERE ModuleCode='MODULE123'"; //Most recent entry
            db.query(sql, function(err, result) {
            	if (err) throw err;
                expect(result[0]['ModuleName']).equal("Some Module");
                done();
            });
        });
        it('Update', function(done) {
        	sql = "UPDATE Module" +
        		" SET ModuleName='Some Other Module'"+
        		" WHERE ModuleCode='MODULE123'";
        	db.query(sql, function(err, result) {
        		if (err) throw err;
            	expect(result.affectedRows).equal(1);
           	 	done();
        	});
        });
        it('Delete', function(done) {
        	sql = "DELETE FROM Module"+
    		" WHERE ModuleCode='MODULE123'";
        	db.query(sql, function(err, result) {
        		if (err) throw err;
        		expect(result.affectedRows).equal(1);
            	done();
        	});
        });
    });

    /*
	Coursework table
	*/
    describe('Coursework', function() {
        it('Create', function(done) {
            sql = "INSERT INTO Coursework (ModuleCode, CourseworkNumber, SetDate, DueDate, ReturnDate, Weighting, MaxMark, Notes, FileName)" +
                " VALUES ('COMP1011','1','2018-02-02','2018-02-02','2018-02-02',10,10,'n/a','file.pdf')";
            db.query(sql, function(err, result) {
            	if (err) throw err;
                expect(result.affectedRows).equal(1);
                done();
            });
        });
        it('Read', function(done) {
            sql = "SELECT * FROM Coursework"+
            " WHERE id=(SELECT MAX(id) FROM Coursework)"; //Most recent entry
            db.query(sql, function(err, result) {
            	if (err) throw err;
                expect(result[0]['ModuleCode']).equal("COMP1011");
                done();
            });
        });
        it('Update', function(done) {
        	//Get the ID first
            sql = "SELECT id FROM Coursework"+
            " WHERE id=(SELECT MAX(id) FROM Coursework)"; //Most recent entry
            db.query(sql, function(err, result) {
            	if (err) throw err;
            	id = result[0]['id'];
            	sql = "UPDATE Coursework" +
            		" SET ModuleCode='COMP1021'"+
            		" WHERE id="+id;
            	db.query(sql, function(err, result) {
            		if (err) throw err;
                	expect(result.affectedRows).equal(1);
               	 	done();
            	});
            });
        });
        it('Delete', function(done) {
        	//Get the ID first
            sql = "SELECT id FROM Coursework"+
            " WHERE id=(SELECT MAX(id) FROM Coursework)"; //Most recent entry
            db.query(sql, function(err, result) {
            	if (err) throw err;
            	id = result[0]['id'];
            	sql = "DELETE FROM Coursework"+
        		" WHERE id="+id;
            	db.query(sql, function(err, result) {
            		if (err) throw err;
            		expect(result.affectedRows).equal(1);
                	done();
            	});
            });
        });
    });

    /*
	CourseworkMark table
	*/
    describe('CourseworkMark', function() {
        it('Create', function(done) {
            sql = "INSERT INTO CourseworkMark (CourseworkID,StudentID,RawMark)" +
                " VALUES (1,1,1)";
            db.query(sql, function(err, result) {
            	if (err) throw err;
                expect(result.affectedRows).equal(1);
                done();
            });
        });
        it('Read', function(done) {
            sql = "SELECT * FROM CourseworkMark"+
            " WHERE id=(SELECT MAX(id) FROM CourseworkMark)"; //Most recent entry
            db.query(sql, function(err, result) {
            	if (err) throw err;
                expect(result[0]['RawMark']).equal(1);
                done();
            });
        });
        it('Update', function(done) {
        	//Get the ID first
            sql = "SELECT id FROM CourseworkMark"+
            " WHERE id=(SELECT MAX(id) FROM CourseworkMark)"; //Most recent entry
            db.query(sql, function(err, result) {
            	if (err) throw err;
            	id = result[0]['id'];
            	sql = "UPDATE CourseworkMark" +
            		" SET RawMark=2"+
            		" WHERE id="+id;
            	db.query(sql, function(err, result) {
            		if (err) throw err;
                	expect(result.affectedRows).equal(1);
               	 	done();
            	});
            });
        });
        it('Delete', function(done) {
        	//Get the ID first
            sql = "SELECT id FROM CourseworkMark"+
            " WHERE id=(SELECT MAX(id) FROM CourseworkMark)"; //Most recent entry
            db.query(sql, function(err, result) {
            	if (err) throw err;
            	id = result[0]['id'];
            	sql = "DELETE FROM CourseworkMark"+
        		" WHERE id="+id;
            	db.query(sql, function(err, result) {
            		if (err) throw err;
            		expect(result.affectedRows).equal(1);
                	done();
            	});
            });
        });
    });

    /*
	Exam table
	*/
    describe('Exam', function() {
        it('Create', function(done) {
            sql = "INSERT INTO Exam (ModuleCode, Weighting, MaxMark, FileName)" +
                " VALUES ('COMP1011',10,10,'file.pdf')";
            db.query(sql, function(err, result) {
            	if (err) throw err;
                expect(result.affectedRows).equal(1);
                done();
            });
        });
        it('Read', function(done) {
            sql = "SELECT * FROM Exam"+
            " WHERE id=(SELECT MAX(id) FROM Exam)"; //Most recent entry
            db.query(sql, function(err, result) {
            	if (err) throw err;
                expect(result[0]['ModuleCode']).equal("COMP1011");
                done();
            });
        });
        it('Update', function(done) {
        	//Get the ID first
            sql = "SELECT id FROM Exam"+
            " WHERE id=(SELECT MAX(id) FROM Exam)"; //Most recent entry
            db.query(sql, function(err, result) {
            	if (err) throw err;
            	id = result[0]['id'];
            	sql = "UPDATE Exam" +
            		" SET ModuleCode='COMP1021'"+
            		" WHERE id="+id;
            	db.query(sql, function(err, result) {
            		if (err) throw err;
                	expect(result.affectedRows).equal(1);
               	 	done();
            	});
            });
        });
        it('Delete', function(done) {
        	//Get the ID first
            sql = "SELECT id FROM Exam"+
            " WHERE id=(SELECT MAX(id) FROM Exam)"; //Most recent entry
            db.query(sql, function(err, result) {
            	if (err) throw err;
            	id = result[0]['id'];
            	sql = "DELETE FROM Exam"+
        		" WHERE id="+id;
            	db.query(sql, function(err, result) {
            		if (err) throw err;
            		expect(result.affectedRows).equal(1);
                	done();
            	});
            });
        });
    });

    /*
	ExamMark table
	*/
    describe('ExamMark', function() {
        it('Create', function(done) {
            sql = "INSERT INTO ExamMark (ExamID,StudentID,RawMark)" +
                " VALUES (1,1,1)";
            db.query(sql, function(err, result) {
            	if (err) throw err;
                expect(result.affectedRows).equal(1);
                done();
            });
        });
        it('Read', function(done) {
            sql = "SELECT * FROM ExamMark"+
            " WHERE id=(SELECT MAX(id) FROM ExamMark)"; //Most recent entry
            db.query(sql, function(err, result) {
            	if (err) throw err;
                expect(result[0]['RawMark']).equal(1);
                done();
            });
        });
        it('Update', function(done) {
        	//Get the ID first
            sql = "SELECT id FROM ExamMark"+
            " WHERE id=(SELECT MAX(id) FROM ExamMark)"; //Most recent entry
            db.query(sql, function(err, result) {
            	if (err) throw err;
            	id = result[0]['id'];
            	sql = "UPDATE ExamMark" +
            		" SET RawMark=2"+
            		" WHERE id="+id;
            	db.query(sql, function(err, result) {
            		if (err) throw err;
                	expect(result.affectedRows).equal(1);
               	 	done();
            	});
            });
        });
        it('Delete', function(done) {
        	//Get the ID first
            sql = "SELECT id FROM ExamMark"+
            " WHERE id=(SELECT MAX(id) FROM ExamMark)"; //Most recent entry
            db.query(sql, function(err, result) {
            	if (err) throw err;
            	id = result[0]['id'];
            	sql = "DELETE FROM ExamMark"+
        		" WHERE id="+id;
            	db.query(sql, function(err, result) {
            		if (err) throw err;
            		expect(result.affectedRows).equal(1);
                	done();
            	});
            });
        });
    });

    /*
	Enrolment table
	*/
    describe('Enrolment', function() {
        it('Create', function(done) {
            sql = "INSERT INTO Enrolment(ModuleCode, StudentID, LevelOfStudy, YearTaken, OverallResult)" +
                " VALUES ('COMP1011',1,1,2014,50)";
            db.query(sql, function(err, result) {
            	if (err) throw err;
                expect(result.affectedRows).equal(1);
                done();
            });
        });
        it('Read', function(done) {
            sql = "SELECT * FROM Enrolment"+
            " WHERE id=(SELECT MAX(id) FROM Enrolment)"; //Most recent entry
            db.query(sql, function(err, result) {
            	if (err) throw err;
                expect(result[0]['ModuleCode']).equal('COMP1011');
                done();
            });
        });
        it('Update', function(done) {
        	//Get the ID first
            sql = "SELECT id FROM Enrolment"+
            " WHERE id=(SELECT MAX(id) FROM Enrolment)"; //Most recent entry
            db.query(sql, function(err, result) {
            	if (err) throw err;
            	id = result[0]['id'];
            	sql = "UPDATE Enrolment" +
            		" SET OverallResult=51"+
            		" WHERE id="+id;
            	db.query(sql, function(err, result) {
            		if (err) throw err;
                	expect(result.affectedRows).equal(1);
               	 	done();
            	});
            });
        });
        it('Delete', function(done) {
        	//Get the ID first
            sql = "SELECT id FROM Enrolment"+
            " WHERE id=(SELECT MAX(id) FROM Enrolment)"; //Most recent entry
            db.query(sql, function(err, result) {
            	if (err) throw err;
            	id = result[0]['id'];
            	sql = "DELETE FROM Enrolment"+
        		" WHERE id="+id;
            	db.query(sql, function(err, result) {
            		if (err) throw err;
            		expect(result.affectedRows).equal(1);
                	done();
            	});
            });
        });
    });

    /*
	Assessing table
	*/
    describe('Assessing', function() {
        it('Create', function(done) {
            sql = "INSERT INTO Assessing (AcademicStaffID, ModuleCode)" +
                " VALUES (1,'COMP1011')";
            db.query(sql, function(err, result) {
            	if (err) throw err;
                expect(result.affectedRows).equal(1);
                done();
            });
        });
        it('Read', function(done) {
            sql = "SELECT * FROM Assessing"+
            " WHERE id=(SELECT MAX(id) FROM Assessing)"; //Most recent entry
            db.query(sql, function(err, result) {
            	if (err) throw err;
                expect(result[0]['ModuleCode']).equal('COMP1011');
                done();
            });
        });
        it('Update', function(done) {
        	//Get the ID first
            sql = "SELECT id FROM Assessing"+
            " WHERE id=(SELECT MAX(id) FROM Assessing)"; //Most recent entry
            db.query(sql, function(err, result) {
            	if (err) throw err;
            	id = result[0]['id'];
            	sql = "UPDATE Assessing" +
            		" SET ModuleCode='COMP1021'"+
            		" WHERE id="+id;
            	db.query(sql, function(err, result) {
            		if (err) throw err;
                	expect(result.affectedRows).equal(1);
               	 	done();
            	});
            });
        });
        it('Delete', function(done) {
        	//Get the ID first
            sql = "SELECT id FROM Assessing"+
            " WHERE id=(SELECT MAX(id) FROM Assessing)"; //Most recent entry
            db.query(sql, function(err, result) {
            	if (err) throw err;
            	id = result[0]['id'];
            	sql = "DELETE FROM Assessing"+
        		" WHERE id="+id;
            	db.query(sql, function(err, result) {
            		if (err) throw err;
            		expect(result.affectedRows).equal(1);
                	done();
            	});
            });
        });
    });

    /*
	Teaching table
	*/
    describe('Teaching', function() {
        it('Create', function(done) {
            sql = "INSERT INTO Teaching (AcademicStaffID, ModuleCode)" +
                " VALUES (1,'COMP1011')";
            db.query(sql, function(err, result) {
            	if (err) throw err;
                expect(result.affectedRows).equal(1);
                done();
            });
        });
        it('Read', function(done) {
            sql = "SELECT * FROM Teaching"+
            " WHERE id=(SELECT MAX(id) FROM Teaching)"; //Most recent entry
            db.query(sql, function(err, result) {
            	if (err) throw err;
                expect(result[0]['ModuleCode']).equal('COMP1011');
                done();
            });
        });
        it('Update', function(done) {
        	//Get the ID first
            sql = "SELECT id FROM Teaching"+
            " WHERE id=(SELECT MAX(id) FROM Teaching)"; //Most recent entry
            db.query(sql, function(err, result) {
            	if (err) throw err;
            	id = result[0]['id'];
            	sql = "UPDATE Teaching" +
            		" SET ModuleCode='COMP1021'"+
            		" WHERE id="+id;
            	db.query(sql, function(err, result) {
            		if (err) throw err;
                	expect(result.affectedRows).equal(1);
               	 	done();
            	});
            });
        });
        it('Delete', function(done) {
        	//Get the ID first
            sql = "SELECT id FROM Teaching"+
            " WHERE id=(SELECT MAX(id) FROM Teaching)"; //Most recent entry
            db.query(sql, function(err, result) {
            	if (err) throw err;
            	id = result[0]['id'];
            	sql = "DELETE FROM Teaching"+
        		" WHERE id="+id;
            	db.query(sql, function(err, result) {
            		if (err) throw err;
            		expect(result.affectedRows).equal(1);
                	done();
            	});
            });
        });
    });

    /*
	Transfer
	*/
    describe('Transfer', function() {
        it('Create', function(done) {
            sql = "INSERT INTO Transfer (StudentID, PreviousCourseID, NewCourseID, Date)" +
                " VALUES (1,1,2,'2018-04-20')";
            db.query(sql, function(err, result) {
            	if (err) throw err;
                expect(result.affectedRows).equal(1);
                done();
            });
        });
        it('Read', function(done) {
            sql = "SELECT * FROM Transfer"+
            " WHERE id=(SELECT MAX(id) FROM Transfer)"; //Most recent entry
            db.query(sql, function(err, result) {
            	if (err) throw err;
                expect(result[0]['StudentID']).equal(1);
                done();
            });
        });
        it('Update', function(done) {
        	//Get the ID first
            sql = "SELECT id FROM Transfer"+
            " WHERE id=(SELECT MAX(id) FROM Transfer)"; //Most recent entry
            db.query(sql, function(err, result) {
            	if (err) throw err;
            	id = result[0]['id'];
            	sql = "UPDATE Transfer" +
            		" SET StudentID=2"+
            		" WHERE id="+id;
            	db.query(sql, function(err, result) {
            		if (err) throw err;
                	expect(result.affectedRows).equal(1);
               	 	done();
            	});
            });
        });
        it('Delete', function(done) {
        	//Get the ID first
            sql = "SELECT id FROM Transfer"+
            " WHERE id=(SELECT MAX(id) FROM Transfer)"; //Most recent entry
            db.query(sql, function(err, result) {
            	if (err) throw err;
            	id = result[0]['id'];
            	sql = "DELETE FROM Transfer"+
        		" WHERE id="+id;
            	db.query(sql, function(err, result) {
            		if (err) throw err;
            		expect(result.affectedRows).equal(1);
                	done();
            	});
            });
        });
    });

    /*
	User
	*/
    describe('User', function() {
        it('Create', function(done) {
            sql = "INSERT INTO User (Username, Type, Password)" +
                " VALUES ('some.user','student','pass')";
            db.query(sql, function(err, result) {
            	if (err) throw err;
                expect(result.affectedRows).equal(1);
                done();
            });
        });
        it('Read', function(done) {
            sql = "SELECT * FROM User"+
            " WHERE id=(SELECT MAX(id) FROM User)"; //Most recent entry
            db.query(sql, function(err, result) {
            	if (err) throw err;
                expect(result[0]['Username']).equal('some.user');
                done();
            });
        });
        it('Update', function(done) {
        	//Get the ID first
            sql = "SELECT id FROM User"+
            " WHERE id=(SELECT MAX(id) FROM User)"; //Most recent entry
            db.query(sql, function(err, result) {
            	if (err) throw err;
            	id = result[0]['id'];
            	sql = "UPDATE User" +
            		" SET Password='newPass'"+
            		" WHERE id="+id;
            	db.query(sql, function(err, result) {
            		if (err) throw err;
                	expect(result.affectedRows).equal(1);
               	 	done();
            	});
            });
        });
        it('Delete', function(done) {
        	//Get the ID first
            sql = "SELECT id FROM User"+
            " WHERE id=(SELECT MAX(id) FROM User)"; //Most recent entry
            db.query(sql, function(err, result) {
            	if (err) throw err;
            	id = result[0]['id'];
            	sql = "DELETE FROM User"+
        		" WHERE id="+id;
            	db.query(sql, function(err, result) {
            		if (err) throw err;
            		expect(result.affectedRows).equal(1);
                	done();
            	});
            });
        });
    });

    /*
	SemesterWeek
	*/
    describe('SemesterWeek', function() {
        it('Create', function(done) {
            sql = "INSERT INTO SemesterWeek (YearOfStudy, SemesterNumber, WeekNumber, StartDate, EndDate)" +
                " VALUES ('2122',1,1,'2123-01-01','2123-01-01')";
            db.query(sql, function(err, result) {
            	if (err) throw err;
                expect(result.affectedRows).equal(1);
                done();
            });
        });
        it('Read', function(done) {
            sql = "SELECT * FROM SemesterWeek"+
            " WHERE YearOfStudy='2122'"; //Most recent entry
            db.query(sql, function(err, result) {
            	if (err) throw err;
                expect(result[0]['WeekNumber']).equal(1);
                done();
            });
        });
        it('Update', function(done) {
        	sql = "UPDATE SemesterWeek" +
        		" SET WeekNumber=2"+
        		" WHERE YearOfStudy='2122'";
        	db.query(sql, function(err, result) {
        		if (err) throw err;
            	expect(result.affectedRows).equal(1);
           	 	done();
        	});
        });
        it('Delete', function(done) {
        	sql = "DELETE FROM SemesterWeek"+
    		" WHERE YearOfStudy='2122'";
        	db.query(sql, function(err, result) {
        		if (err) throw err;
        		expect(result.affectedRows).equal(1);
            	done();
        	});
        });
    });

})