import { gql } from '@apollo/client'

const TIMERECORD_INFO = `
  timespent
  startdate
  enddate
  running
  notes
  task{
    id
  }
  contact {
    id
    fullname
  }
`

export const getTasks = gql`
query GET_TASKS {
  tasks(
    input: {
      limit: 10
      orderby: { name: asc }
      where: {
          displaytype:{NEQ:heading},
          status: { EQ: active } }
    }
  ) {
    id
    name
    timerecords {
      ${TIMERECORD_INFO}
    }
    taskTotalTimespent: timespent
  }
}
`

export const startTimer = gql`
mutation START_TIMERECORD($input: StartTimerecordInput) {
  startTimerecord(input: $input) {
    ${TIMERECORD_INFO}
  }
}
`

export const stopTimer = gql`
mutation STOP_TIMERECORD($input: StartTimerecordInput) {
  stopTimerecord(input: $input) {
   ${TIMERECORD_INFO}
  }
}
`
