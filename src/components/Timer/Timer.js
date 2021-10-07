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
  const [milliseconds, status, start, pause, stop, restart] = useStopwatch({ interval: 1000 });

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