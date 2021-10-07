import { FC, memo } from 'react'
import List from '@material-ui/core/List'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import { makeStyles, Theme } from '@material-ui/core/styles'
import TaskItem from '../TaskItem'
import { ITask } from '../../interfaces'

interface TaskListProps {
    tasks: ITask[];
    setCurrentTaskId(id: string): void;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
    background: 'rgb(205, 242, 238, 0.1)',
    marginBottom: theme.spacing(2),
  },
  header: {
    textAlign: 'center',
  }
}))

const TaskList: FC<TaskListProps> = ({ tasks, setCurrentTaskId }) => {
  const classes = useStyles()

  return (
    <Card className={classes.root}>
      <Typography className={classes.header}>Tasks</Typography>
      <List>
        {tasks.map((task, index) => (
          <TaskItem
            key={task.id}
            id={task.id}
            name={`${index+1}. ${task.name}`}
            setCurrentTaskId={setCurrentTaskId}
          />
        ))}
      </List>
    </Card>
  )
}

export default memo(TaskList)
