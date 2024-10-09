const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript",
};

const AssignmentGroup = {
  id: 12345,
  name: "Fundam5ntals of JavaScript",
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

const LearnerSubmissions = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 50,
    },
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 50,
    },
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 50,
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




function getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions) {

  let result = [];
  let averageItems = [];
  let valid = false; 
  let submission = [];
  let assignments = AssignmentGroup.assignments;
  let current = [];
  let assignmentGrade;
  let deduction;
  
  const courseID = CourseInfo.id; 
  const assignGroupID = AssignmentGroup.course_id; 
 
  try {
    if (courseID === assignGroupID) {
      valid = true;
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
            
            let score = (user.submission.score);
            let totalPossible = (assignmentObject.points_possible);

            try {
              if (totalPossible > 0) {
                valid = true;

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

                
              }   else {
                throw new TypeError("Oops, you can't have zero as a total points possible.")
              }
          

            } catch (error) {
            console.log(error)
              return; 
            }
           
    
           
          }
        }
      }

      getAssignments()
    
      if (valid){
        function getStudents(arr) {
          return arr.filter((value, index) => arr.indexOf(value) == index);
        }
         
      } else {throw new TypeError("Please try again.")}
    
    
     for (let i = 0; i < submission.length; i++) {
    
             let item = submission[i];
            const userId = item[0].user.learner_id;
    
            current.push(userId);

          }
         
    
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
    
            grade2 = Number(grade2 += assignGrade2.assignmentGrade); 
          }
          let array = ((grade.split()))
    
         grade = Number(`${array[index]}`); 
       
        })
    
        let tempObj = {}; 
        let num1 = Number(1); 
        let num2 = Number(2) ;
      
        if (!result.includes(id)) {
    
          if (grade2 !== "") {
    
            tempObj = { id: Number(id), avg: Number(avg), [num1] : Number(grade), [num2] : Number(grade2)  }
            result.push(tempObj); 
    
           }
        } 
      }

      // I was trying to validate my inputs for average and id to make sure that they are numbers and if they aren't then I was going to throw an error. I was able to validate that the course_id matches and that the points possible is above 0. 
    
    //  let objectNums = Object.values(result); 

    // objectNums.forEach((number) => {
    //   try {
    //     if (number.avg || number.id !== 'NAN') {
    //       throw new TypeError('Error, please use numbers')
    //     }
    //   } catch (err) {
    //     console.log(err)
    //   }
    // })
        
    
  
      return result;
       
    } else {
      throw new Error('Oops, your course_id does not match!');
    }
  } catch ({name, message}) {
    console.log(message)
  } 
  }  

 




  let myResult = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
  console.log(myResult);
