import * as React from "react";
import PageActions from "./button-groups/page-settings";


const Page: React.FC<{
    children: React.ReactElement | React.ReactElement[];
}> = ({children}) => {

    return (
        <>
            {children}
            <PageActions />
        </>
    );
};

export default React.memo(Page);