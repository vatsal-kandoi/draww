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
import { IEvent } from "../../interfaces/events";


const LastEvent: React.FC<{count: number, i18n: I18n, handleEventCollapsibleEvent: any, isOpen: boolean, event: IEvent | null}> = (props) => {
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
            {(props.event !== null) ? (
                <ListItemText primary={props.event.header}
                        secondary={
                            <>
                                <Typography sx={{ display: 'inline', marginRight: "0.5em" }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary" >
                                    {props.event.user_name}
                                </Typography>
                                {props.event.description}
                            </>
                        } />
            ) : (
                <ListItemText primary={"No events created"} />
            )}
        </ListItem>
    );
}

const Event: React.FC<{i18n: I18n, event: IEvent, onDeleteEvent: any, showDeleteOption: boolean}> = (props) => {    
    return (
        <ListItem alignItems="flex-start"
                secondaryAction={
                    <>
                        {(props.showDeleteOption ) ? (
                            <IconButton onClick={() => props.onDeleteEvent(props.event.event_id)} aria-label={props.i18n.t("aria_messages_event_delete")}>
                                <DeleteIcon/>
                            </IconButton>
                        ) : null }
                    </>
                }>
            <ListItemText primary={props.event.header}
                    secondary={
                        <>
                            <Typography sx={{ display: 'inline', marginRight: "0.5em" }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary" >
                                {props.event.user_name}
                            </Typography>
                            {props.event.description}
                        </>
                    } />
        </ListItem>
    );}


export {LastEvent, Event};