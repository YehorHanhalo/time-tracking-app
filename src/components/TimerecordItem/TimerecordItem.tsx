import { FC, memo } from 'react'
import moment from 'moment'
import ListItem from '@material-ui/core/ListItem'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { getTimeFromMinutes } from '../../utils'

interface TimerecordItemProps {
  enddate: string;
  notes: string;
  startdate: string;
  timespent: number;
  trackedBy: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(1),
    width: '100%',
  },
}));

const TimerecordItem: FC<TimerecordItemProps> = ({enddate, notes, startdate, timespent, trackedBy}) => {
    const classes = useStyles()

    const timeFormat = "hh:mm DD MMM"
    const startDate = moment(startdate).format(timeFormat)
    const endDate = moment(enddate).format(timeFormat)

    const { hours, mins } = getTimeFromMinutes(timespent)

    return (
        <ListItem>
            <Card className={classes.root}>
                <Typography>Start: {startDate.toString()}</Typography>
                <Typography>End: {endDate.toString()}</Typography>
                <Typography>Time tracked: {hours}:{mins}</Typography>
                <Typography>Notes: {notes}</Typography>
                <Typography>Tracked by: {trackedBy}</Typography>
            </Card>
        </ListItem>
    )
}

export default memo(TimerecordItem)