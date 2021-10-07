import { FC, memo, useCallback, useState } from 'react';
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { makeStyles, Theme } from '@material-ui/core/styles'
import TimerecordList from '../TimerecordList'
import Timer from '../Timer'
import { ITask, ITimerecord } from '../../interfaces'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
    background: 'rgb(205, 242, 238, 0.1)',
    '& > :not(:last-child)': {
        marginBottom: theme.spacing(2),
    },
  },
  header: {
    textAlign: 'center',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'center',
    '& > :not(:last-child)': {
        marginRight: theme.spacing(3),
    },
  }
}));

interface CurrentTaskProps {
    currentTask: ITask | null;
    handleStopTimerById(): void;
    handleStartTimerById(): void;
    activeTimer: ITimerecord | null;
}

const CurrentTask: FC<CurrentTaskProps> = ({ currentTask, handleStopTimerById, handleStartTimerById, activeTimer }) => {
    const classes = useStyles()

    const [isStartedTimer, setIsStartedTimer] = useState<boolean>(false)
    const [shouldRefreshTimer, setShouldRefreshTimer] = useState<boolean>(false)

    const handleStartButtonClick = useCallback(
        () => {
            const isRunningAnotherTimer = activeTimer && currentTask?.id !== activeTimer?.task?.id
            if (isRunningAnotherTimer) {
                setShouldRefreshTimer(true)
            }
            setIsStartedTimer(true)
            handleStartTimerById();
        },
        [setIsStartedTimer, handleStartTimerById, activeTimer, currentTask],
    )

    const handleStopButtonClick = useCallback(
        () => {
            setIsStartedTimer(false)
            handleStopTimerById();
        },
        [setIsStartedTimer, handleStopTimerById],
    )

    if (!currentTask) {
        return (
            <Card className={classes.root}>
                <Typography className={classes.header}>Please, select task</Typography>
            </Card>
        )
    }

    const { name, timerecords, taskTotalTimespent, id } = currentTask

    const isCurrentTask = id === activeTimer?.task?.id
    const isStopButtonDisabled = !isCurrentTask || !activeTimer?.running
    const isStartButtonDisabled = !isStopButtonDisabled

    return (
        <Card className={classes.root}>
            <Typography className={classes.header}>{name}</Typography>
            <Timer
                isStartedTimer={isStartedTimer}
                isCurrentTask={isCurrentTask}
                shouldRefreshTimer={shouldRefreshTimer}
                setShouldRefreshTimer={setShouldRefreshTimer}
            />
            <Grid className={classes.buttons}>
                <Button
                    onClick={handleStartButtonClick}
                    variant="outlined"
                    disabled={isStartButtonDisabled}
                >Start Timer</Button>
                <Button
                    onClick={handleStopButtonClick}
                    variant="outlined"
                    disabled={isStopButtonDisabled}
                >Stop Timer</Button>
            </Grid>
            <TimerecordList timerecords={timerecords} taskTotalTimespent={taskTotalTimespent} />
        </Card>
    )
}

export default memo(CurrentTask)