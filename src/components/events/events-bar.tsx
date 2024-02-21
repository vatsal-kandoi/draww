import * as React from "react";
import Stack from '@mui/material/Stack';
import { Box } from "@mui/material";
import { styled } from '@mui/material/styles';
import { useLanguageStore } from "../../hooks/languageprovider";
import Badge from '@mui/material/Badge';
import PersonIcon from '@mui/icons-material/Person';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from "@mui/material";


const SpacedBadge = styled(Badge)(({ theme }) => ({
    ...theme.typography.body2,
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
}));

const EventBarStack = styled(Stack)(({ theme }) => ({
    ...theme.typography.body2,
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
}));

const getUserCountInEventStore = () => 3;

const EventsBar: React.FC<{}> = () => {
    const i18n = useLanguageStore();
    const userCount = getUserCountInEventStore();

    return (
        <EventBarStack direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2} >
            <Box>
                <h3>{i18n.t("messages_events")}</h3>
            </Box>
            <Stack direction="row" 
                    justifyContent="flex-end" 
                    alignItems="center" >
                <IconButton size="small" 
                        aria-label={i18n.t("aria_buttons_events_reset")}>
                    <DeleteIcon />
                </IconButton>
                <SpacedBadge badgeContent={userCount} 
                        color="secondary"
                        aria-label={i18n.t("aria_messages_user_count")}>
                  <PersonIcon />
                </SpacedBadge>
            </Stack>
        </EventBarStack>

    );
}

export default EventsBar;