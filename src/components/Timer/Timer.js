import { memo, useEffect } from 'react';
import useStopwatch from "use-stopwatch-hook";
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles'
import { getTimeFromMillisec } from '../../utils'

const useStyles = makeStyles(() => ({
  root: {
    textAlign: 'center',
  },
}));

const Timer = ({ isStartedTimer, isCurrentTask, shouldRefreshTimer, setShouldRefreshTimer }) => {
  const classes = useStyles()
  const stopWatch = useStopwatch({ interval: 1000 });

  const milliseconds = stopWatch[0]
  const start = stopWatch[2]
  const stop = stopWatch[4]
  const restart = stopWatch[5]

  useEffect(() => {
    isStartedTimer ? start() : stop()
  }, [isStartedTimer, start, stop])

  useEffect(() => {
    if (shouldRefreshTimer) {
      restart()
      setShouldRefreshTimer(false)
    }
  }, [shouldRefreshTimer, setShouldRefreshTimer, restart])

  const { hours, mins, secs } = getTimeFromMillisec(milliseconds)

    return (
      <Box className={classes.root}>
        <Typography
          component="span"
          variant="h2"
        >
          {isCurrentTask ? `${hours}:${mins}:${secs}` : '00:00:00'}
        </Typography>
      </Box>
    )
}

export default memo(Timer)