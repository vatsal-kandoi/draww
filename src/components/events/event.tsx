import * as React from "react";
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Badge from '@mui/material/Badge';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { I18n } from "i18n-js";
import DeleteIcon from '@mui/icons-material/Delete';


const LastEvent: React.FC<{count: number, i18n: I18n, handleEventCollapsibleEvent: any, isOpen: boolean}> = (props) => {
    return (
        <ListItem alignItems="flex-start"
                secondaryAction={
                    <Badge badgeContent={props.count} 
                            color="secondary">
                        <IconButton edge="end" 
                                aria-label={props.i18n.t((props.isOpen === true) ? "aria_messages_events_hide" : "aria_messages_events_show" )}
                                onClick={props.handleEventCollapsibleEvent}>
                            {(props.isOpen !== true) ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon /> }
                        </IconButton>
                    </Badge>
                }>
            <ListItemText primary="Square creation"
                    secondary={
                        <>
                            <Typography sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary" >
                                Vatsal
                            </Typography>
                            {" created a square"}
                        </>
                    } />
        </ListItem>
    );
}

const Event: React.FC<{i18n: I18n}> = (props) => {    
    return (
        <ListItem alignItems="flex-start"
                secondaryAction={
                    <>
                        <IconButton aria-label={props.i18n.t("aria_messages_event_delete")}>
                            <DeleteIcon />
                        </IconButton>
                    </>
                }>
            <ListItemText primary="Square creation"
                    secondary={
                        <>
                            <Typography sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary" >
                                Vatsal
                            </Typography>
                            {" created a square"}
                        </>
                    } />
        </ListItem>
    );}


export {LastEvent, Event};