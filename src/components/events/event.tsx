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
import { EventBase } from "./structures/event";
import { Tooltip } from "@mui/material";

const LastEventComponent: React.FC<{
    eventCount: number;
    i18n: I18n;
    onCollapsibleBtnClick: () => void;
    isCollapsibleOpen: boolean, 
    event: EventBase | null
}> = (props) => {
    return (
        <ListItem alignItems="flex-start"
                secondaryAction={
                    <Badge badgeContent={props.eventCount} 
                            color="secondary">
                        <Tooltip title={props.i18n.t((props.isCollapsibleOpen === true) ? "aria_buttons_events_hide" : "aria_buttons_events_show" )}>
                            <IconButton edge="end" 
                                    aria-label={props.i18n.t((props.isCollapsibleOpen === true) ? "aria_buttons_events_hide" : "aria_buttons_events_show" )}
                                    onClick={props.onCollapsibleBtnClick}>
                                {(props.isCollapsibleOpen !== true) ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon /> }
                            </IconButton>
                        </Tooltip>
                    </Badge>
                }>
            {(props.event !== null) ? (
                <ListItemText primary={props.event.type}
                        secondary={
                            <>
                                <Typography sx={{ display: 'inline', marginRight: "0.3em" }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary" >
                                    {props.event.user_name}
                                </Typography>
                                {props.event.description}
                            </>
                        } />
            ) : (
                <ListItemText primary={props.i18n.t("messages_noevents")} />
            )}
        </ListItem>
    );
}

const EventComponent: React.FC<{
    i18n: I18n, 
    event: EventBase, 
    onEventDeleteBtnClick?: (event: EventBase) => void, 
    showEventDeleteBtn: boolean
}> = (props) => {        
    const {event, i18n, onEventDeleteBtnClick, showEventDeleteBtn} = props;

    const onClick = React.useCallback(() => {
        if (showEventDeleteBtn && onEventDeleteBtnClick !== undefined) {
            onEventDeleteBtnClick(event);
        }
    }, [event, onEventDeleteBtnClick, showEventDeleteBtn]);

    return (
        <ListItem alignItems="flex-start"
                secondaryAction={
                    <>
                        {(showEventDeleteBtn ) ? (
                            <Tooltip title={i18n.t("aria_buttons_events_delete")}>
                                <IconButton onClick={onClick} 
                                        aria-label={i18n.t("aria_buttons_events_delete")}>
                                    <DeleteIcon/>
                                </IconButton>
                            </Tooltip>
                        ) : null }
                    </>
                }>
            <ListItemText primary={props.event.type}
                    secondary={
                        <>
                            <Typography sx={{ display: 'inline', marginRight: "0.3em" }}
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


export {LastEventComponent, EventComponent};