import { FC, memo } from 'react'
import List from '@material-ui/core/List'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import TimerecordItem from '../TimerecordItem'
import { ITimerecord } from '../../interfaces'

interface TimerecordListProps {
    timerecords: ITimerecord[];
    taskTotalTimespent: number;
}

const useStyles = makeStyles(() => ({
  header: {
    textAlign: 'center',
  }
}))

const TimerecordList: FC<TimerecordListProps> = ({ timerecords, taskTotalTimespent }) => {
  const classes = useStyles()

  if (timerecords.length === 0) {
    return (
        <Box className={classes.header}>
            <Typography>Time Records</Typography>
            <Typography>This task has no time records</Typography>
        </Box>
    )
  }

  return (
    <Box>
      <Typography className={classes.header}>Time Records</Typography>
      <List>
        {timerecords.map(({enddate, notes, contact, startdate, timespent}) => (
          <TimerecordItem
            key={startdate}
            enddate={enddate}
            notes={notes}
            trackedBy={contact.fullname}
            startdate={startdate}
            timespent={timespent}
          />
        ))}
      </List>
      <Typography>Total time spent: {taskTotalTimespent}min</Typography>
    </Box>
  )
}

export default memo(TimerecordList)
