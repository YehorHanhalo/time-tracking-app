import { FC, memo, useCallback, MouseEvent } from 'react'
import ListItem from '@material-ui/core/ListItem'
import { makeStyles, Theme } from '@material-ui/core/styles'

interface TaskItemProps {
    id: string;
    name: string;
    setCurrentTaskId(id: string): void;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(1),
    '&:hover': {
        background: '#B6F3ED',
    },
    border: '1px solid #B6F3ED',
    borderRadius: 4,
    '&:not(:last-child)': {
      marginBottom: 10,
    }
  },
}));

const TaskItem: FC<TaskItemProps> = ({ id, name, setCurrentTaskId }) => {
    const classes = useStyles()

    const handleClick = useCallback(
        (e: MouseEvent<HTMLElement>) => {
            const id = e.currentTarget.getAttribute('data-id')
            id && setCurrentTaskId(id)
        },
        [setCurrentTaskId],
    )

    return (
        <ListItem
            onClick={handleClick}
            data-id={id}
            className={classes.root}
        >
            {name}
        </ListItem>
    )
}

export default memo(TaskItem)