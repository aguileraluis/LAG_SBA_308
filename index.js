// The provided course information.
const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript",
};

// The provided assignment group.
const AssignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  group_weight: 25,
  assignments: [
    {
      id: 1,
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 50,
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150,
    },
    {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 500,
    },
  ],
};

// The provided learner submission data.
const LearnerSubmissions = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47,
    },
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150,
    },
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 400,
    },
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39,
    },
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140,
    },
  },
];

let result = [];
let averageItems = [];

function getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions) {

  let submission = [];
  let assignments = AssignmentGroup.assignments;
  let current = [];
  let assignmentGrade;
  let deduction;
 
  function getAssignments() {
    let userAssignment;
    let assignment;

    for (let i = 0; i < assignments.length; i++) {
      let assignmentObject = assignments[i];
      assignment = assignments[i].id;
     

      for (let i = 0; i < LearnerSubmissions.length; i++) {
        let user = LearnerSubmissions[i];
        userAssignment = LearnerSubmissions[i].assignment_id;
        let learnerID = user.learner_id; 
        let score = Number(user.submission.score);
        let totalPossible = Number(assignmentObject.points_possible);
       

        while (assignment === userAssignment) {

          let dueDate = assignmentObject.due_at;
          let dateSubmitted = user.submission.submitted_at;
          let due = dueDate.toString();
          let submit = dateSubmitted.toString();
          let tot = 0; 
          let poss = 0; 

          switch (true) {
            case due === submit:  

              tot += score; 
              poss += totalPossible; 
              assignmentGrade = Number(score/ totalPossible).toFixed(2);
              averageItems.push({tot, poss, learnerID, userAssignment, assignmentGrade})

              submission.push([
                { assignmentObject, user, late: false, assignmentGrade},
              ]);
              break;

            case due < submit:

              deduction = totalPossible * 0.1;
              score = score - deduction;
              tot += score; 
              poss += totalPossible; 
              assignmentGrade = Number(score/ totalPossible).toFixed(3); 

              averageItems.push({tot, poss, learnerID, userAssignment, assignmentGrade})

              submission.push([
                { assignmentObject, user, late: true, assignmentGrade},
              ]);
              break;

            case due > submit:

              const dueYear = Number(due.slice(0, 4));
              const submitDate = Number(submit.slice(0, 4));

              if (dueYear - submitDate > 1) {
                break;
              } else {
                tot += score; 
                poss += totalPossible; 
                assignmentGrade = Number(score/ totalPossible).toFixed(2); 

                if (assignmentGrade == '1.00') {
                  assignmentGrade = Number(assignmentGrade).toFixed(1)
                }
                averageItems.push({tot, poss, learnerID, userAssignment, assignmentGrade})
           
                submission.push([
                  { assignmentObject, user, late: false, assignmentGrade },
                ]);

                break;
              }
          }
          break;
        }
      }
    }
  }

  getAssignments();

  function getStudents(arr) {
          return arr.filter((value, index) => arr.indexOf(value) == index);
        }

  function getAverage() {


 for (let i = 0; i < submission.length; i++) {

         let item = submission[i];
        const userId = item[0].user.learner_id;

        current.push(userId);

      }
     
    }
    getAverage();

    let learners = getStudents(current);
    let position = learners.length; 

    learners.forEach((learner) => {
      let temp = learner; 
      let tempTot = 0; 
      let tempPoss = 0; 

      for (let i = 0; i < averageItems.length; i++) {
        if (averageItems[i].learnerID === temp) {
          tempTot += averageItems[i].tot; 
          tempPoss += averageItems[i].poss;
          i + position;
        } 
      }

      let average = (tempTot / tempPoss); 
      averageItems.forEach((item) => {
        if (item.learnerID === temp) {
      
        item.average = average; 
    
        }
      })

    })


  for (let i = 0; i < averageItems.length; i++) {
    let id = averageItems[i].learnerID; 
    let avg = averageItems[i].average; 
    let assignGrade = averageItems[i].assignmentGrade; 
 
    let grade = assignGrade; 
    let grade2 = ``; 

    let gradeItem = grade.split()

    gradeItem.forEach((grade, index) => {
      let assignGrade2 = (averageItems[i + 2])

      if (assignGrade2 !== undefined) {

        grade2 = grade2 += assignGrade2.assignmentGrade; 
      }
      let array = ((grade.split()))

     grade = `${array[index]}`; 
   
    })

    let tempObj = {}; 
    let num1 = 1; 
    let num2 = 2 ;
  
    if (!result.includes(id)) {

      if (grade2 !== "") {

        tempObj = { id: id, avg: avg, [num1] : grade, [num2] : grade2  }
        result.push(tempObj); 

       }
    } 
  }

  return result;

}

let myResult = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
console.log(myResult)
