import { FC, useState, useEffect, useCallback, useMemo } from 'react';
import { useQuery, useMutation } from '@apollo/client'
import MDSpinner from 'react-md-spinner';
import { useSnackbar } from 'notistack';
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import { getTasks, startTimer, stopTimer } from './query'
import TaskList from './components/TaskList'
import CurrentTask from './components/CurrentTask'
import { ITask, ITimerecord } from './interfaces'
interface ITasksQueryData {
  tasks: ITask[];
}

const App: FC = () => {
  const { enqueueSnackbar } = useSnackbar();

  const [tasks, setTasks] = useState<ITask[]>([])

  const { data, loading, error: getTasksError, refetch } = useQuery<ITasksQueryData>(getTasks)

  const [startTimerById, { error: startTimerError }] = useMutation(startTimer)
  const [stopTimerById, { error: stopTimerError }] = useMutation(stopTimer)

  useEffect(() => {
    data && setTasks(data.tasks)
  }, [data])

  useEffect(() => {
    const error = getTasksError || startTimerError || stopTimerError
    error && enqueueSnackbar((error as Error).message, { variant: "error"})
  }, [getTasksError, startTimerError, stopTimerError, enqueueSnackbar])

  const [currentTaskId, setCurrentTaskId] = useState<string>('')

  const currentTask = useMemo(() => tasks.find(task => task.id === currentTaskId) || null , [currentTaskId, tasks])

  const [activeTimer, setActiveTimer] = useState<ITimerecord | null>(null)

  const handleStartTimerById = useCallback(() => {
    startTimerById({
      variables: {
        input: {
          taskid: currentTaskId,
        }
      }
    }).then(({ data }) => {
      activeTimer && refetch();
      setActiveTimer(data?.startTimerecord);
    })
  }, [currentTaskId, startTimerById, activeTimer, refetch])

  const handleStopTimerById = useCallback(() => {
    stopTimerById({
      variables: {
        input: {
          taskid: currentTaskId,
        }
      }
    }).then(({ data }) => {
      setActiveTimer(null)
      refetch()
    })
  }, [currentTaskId, stopTimerById, refetch])

  return (
    <Box p={4}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TaskList
            tasks={tasks}
            setCurrentTaskId={setCurrentTaskId}
          />
        </Grid>
        <Grid item xs={6}>
          <CurrentTask
            currentTask={currentTask}
            handleStopTimerById={handleStopTimerById}
            handleStartTimerById={handleStartTimerById}
            activeTimer={activeTimer}
          />
        </Grid>
      </Grid>
      {loading && <MDSpinner style={{ position: "absolute", top: "50%", left: "50%" }} />}
    </Box>
  );
}

export default App;
