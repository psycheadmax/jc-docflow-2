const Promise = require('bluebird')
const AppDAO = require('./dao')
const JCDBRepository = require('./jcdb_repository')


function insertClient() {
  const dao = new AppDAO('./database.sqlite3')
  const blogProjectData = { name: 'Write Node.js - SQLite Tutorial' }
  const jcdbRepo = new JCDBRepository(dao)
  let projectId

  jcdbRepo.createTable()
    .then((data) => {
      projectId = data.id
      const client = [
        {
          lastName: 'Korn',
          firstName: 'Max',
          middleName: 'V.',
          birthday: '1983-04-15',
          gender: 'male',
          projectId
        }
      ]
      return Promise.all(client.map((element) => {
        const { lastName, firstName, middleName, birthday, gender, projectId } = element
        return jcdbRepo.create(lastName, firstName, middleName, birthday, gender, projectId)
      }))
    })
}

export default insertClient

//   projectRepo.createTable()
//     .then(() => taskRepo.createTable())
//     .then(() => projectRepo.create(blogProjectData.name))
//     .then((data) => {
//       projectId = data.id
//       const tasks = [
//         {
//           name: 'Outline',
//           description: 'High level overview of sections',
//           isComplete: 1,
//           projectId
//         },
//         {
//           name: 'Write',
//           description: 'Write article contents and code examples',
//           isComplete: 0,
//           projectId
//         }
//       ]
//       return Promise.all(tasks.map((task) => {
//         const { name, description, isComplete, projectId } = task
//         return taskRepo.create(name, description, isComplete, projectId)
//       }))
//     })
//     .then(() => projectRepo.getById(projectId))
//     .then((project) => {
//       console.log(`\nRetreived project from database`)
//       console.log(`project id = ${project.id}`)
//       console.log(`project name = ${project.name}`)
//       return taskRepo.getTasks(project.id)
//     })
//     .then((tasks) => {
//       console.log('\nRetrieved project tasks from database')
//       return new Promise((resolve, reject) => {
//         tasks.forEach((task) => {
//           console.log(`task id = ${task.id}`)
//           console.log(`task name = ${task.name}`)
//           console.log(`task description = ${task.description}`)
//           console.log(`task isComplete = ${task.isComplete}`)
//           console.log(`task projectId = ${task.projectId}`)
//         })
//       })
//       resolve('success')
//     })
//     .catch((err) => {
//       console.log('Error: ')
//       console.log(JSON.stringify(err))
//     })
// }