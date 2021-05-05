class Student():
    counter = 0

    def __init__(self, fname, lname, index, major, year):
        self.fname = fname
        self.lname = lname
        self.__index = index
        self.major = major
        self.year = year
        Student.counter += 1

    def year(method):
        def wrapper(*args):
            string = 'Year: 2\n'
            return method(*args) + string
        return wrapper

    @year
    def __str__(self):
        string = 'First name: ' + self.fname + '\n'
        string += 'Last name: ' + self.lname + '\n'
        string += 'Index: ' + self.__index + '\n'
        string += 'Major: ' + self.major + '\n'
        return string

    def __gt__(self, student):
        if(self.fname > student.fname):
            return self.fname + ' > ' + student.fname
        else:
            return self.fname + ' < ' + student.fname

    def __eq__(self, student):
        if(self.fname == student.fname):
            return self.fname + ' == ' + student.fname
        else:
            return self.fname + ' != ' + student.fname

    def getCounter(self):
        return Student.counter

    def getYear(self):
        return self.year


class StudentIT(Student):
    def __init__(self, fname, lname, index, speciality, year):
        super(StudentIT, self).__init__(fname, lname, index, year=year, major='IIS')
        self.speciality = speciality

def tests():
    studentA = Student('John', 'Smith', '12345', 'IT', 2)
    print(str(studentA))

    studentB = Student('Mike', 'Oak', '33333', 'Medicine', 3)
    studentC = Student('Mike', 'Stone', '55321', 'Law', 1)
    print(studentA > studentB)
    print(studentB == studentC)
    print(studentA == studentC)
    print('\nCounter: ' + str(studentC.getCounter()))

    studentIT = Student('Will', 'Blank', '99115', 'Programming', year=4)

if __name__ == "__main__":
    tests()

