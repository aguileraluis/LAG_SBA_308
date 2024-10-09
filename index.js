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
let grades = [];
let averageItems = [];
let totalTemp = 0;
let possibleTemp = 0;

function getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions) {

  let submission = [];
  let assignments = AssignmentGroup.assignments;
  let current = [];
  let assignmentGrade;
  let average;
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
              assignmentGrade = score/ totalPossible; 
             
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
              assignmentGrade = score/ totalPossible; 

             
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
                assignmentGrade = score/ totalPossible; 
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
         const submissionAllowed = item[0];
        const userId = item[0].user.learner_id;
         const itemID = item[0].user.assignment_id;
         const user = item[0].user;
  

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
      // console.log(average)
      averageItems.forEach((item) => {
        if (item.learnerID === temp) {
      
        item.average = average; 
        console.log(item)
        }
      })


     

      // submission.forEach((sub) => {
      //   console.log(sub)
      // })
    })

    
  result = [];
 
}

getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
