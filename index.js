// The provided course information.
const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript"
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
      points_possible: 50
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150
    },
    {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 500
    }
  ]
};

// The provided learner submission data.
const LearnerSubmissions = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47
    }
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150
    }
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 400
    }
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39
    }
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140
    }
  }
];

const result = []; 

function getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions) {

  let totalScore = 0; 
  let possiblePoints = 0; 
  let late = false; 
  let submission = []; 
  let assignments = (AssignmentGroup.assignments);

  function getAssignments() {

    // console.log(date); 

   let userAssignment;  
   let assignment; 

  //  assignments.forEach(assignment => console.log(assignment.id))
  
  for (let i = 0; i < assignments.length; i++) {
    let assignmentObject = assignments[i]; 
    assignment = assignments[i].id; 
    // console.log(assignment + 'I am the assignment assigned')

    for (let i = 0; i < LearnerSubmissions.length; i++) {
      let userObject = LearnerSubmissions[i]; 
      userAssignment = LearnerSubmissions[i].assignment_id; 
      // console.log(userAssignment + 'I am the submitted assignment')
      let user = LearnerSubmissions[i]; 

      if (assignment === userAssignment) {
        // submission.push({ assignment, user});  
        let dueDate = assignmentObject.due_at; 
        let dateSubmitted = userObject.submission.submitted_at; 

        let due = dueDate.toString(); 
        let submit = dateSubmitted.toString();
        
        // if (due === submit) {
        //   console.log(assignment, user)
        //   console.log('assignment is due' + due, submit); 
        // } else if (due > submit) {
        //   console.log(assignment, user)

        //   console.log('assignment is not due yet' + due, submit); 
        // } else if (due < submit) {
        //   console.log(assignment, user)

        //   console.log('assignment is past due' + due, submit); 
        // }

        switch (true) {
          case due === submit:
            // console.log('assignment is due' + due, submit)
            submission.push({assignmentObject, user, late: false})
            break; 
          case due < submit:
          // console.log('assignment is past due' + due, submit)
          submission.push({assignmentObject, user, late: true})
          break;
          default: 
          // console.log('assignment is not due yet' + due, submit)
          break; 
        }
      }
   
       let submittedDate = LearnerSubmissions[i].submission.submitted_at; 
   
       
       let resultItem = { id: LearnerSubmissions[i].learner_id }
   
   
     }
  }
  }

  getAssignments()

  console.log(submission)
  
}



getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions); 

// console.log(result); 