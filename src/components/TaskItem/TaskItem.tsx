import { FC, memo, useCallback, MouseEvent } from 'react'
import ListItem from '@material-ui/core/ListItem'
import { makeStyles, Theme } from '@material-ui/core/styles'
import clsx from 'clsx';

interface TaskItemProps {
    id: string;
    name: string;
    isCurrentTask: boolean;
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
  selected: {
        background: '#B6F3ED',
    },
}));

const TaskItem: FC<TaskItemProps> = ({ id, name, setCurrentTaskId, isCurrentTask }) => {
    const classes = useStyles()

    const handleClick = useCallback(
        (e: MouseEvent<HTMLElement>) => {
            setCurrentTaskId(id)
        },
        [setCurrentTaskId, id],
    )

    return (
        <ListItem
            onClick={handleClick}
            className={clsx(classes.root, isCurrentTask && classes.selected)}
        >
            {name}
        </ListItem>
    )
}

export default memo(TaskItem)