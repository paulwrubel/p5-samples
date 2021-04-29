import React from 'react';
import { List, ListItem, ListItemText, Collapse } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import "./AppList.css"
class AppList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isAppListExpanded: false
        };

        this.handleAppListExpansionToggle = this.handleAppListExpansionToggle.bind(this);
    }

    handleAppListExpansionToggle(newValue) {
        this.setState((oldState, _) => ({
            isAppListExpanded: !oldState.isAppListExpanded
        }));
    }

    render() {
        let appArray = Array.from(this.props.apps.values());
        // appArray.sort((a, b) => {
        //     let aDate = new Date(a.creationDate);
        //     let bDate = new Date(b.creationDate);
        //     console.log(aDate);
        //     return aDate.getTime() - bDate.getTime();
        // });
        appArray.sort((a, b) => {
            let isABeforeB = a.displayName.toLowerCase() < b.displayName.toLowerCase();
            return isABeforeB ? -1 : 1;
        });
        console.log(appArray);
        return (
            <div
                className="AppList"
                role="presentation"
            >

                <ListItem button onClick={this.handleAppListExpansionToggle}>
                    <ListItemText primary="Apps" />
                    {this.state.isAppListExpanded ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={this.state.isAppListExpanded} timeout="auto" unmountOnExit>
                    <List component="div" onClick={this.props.toggleDrawer(false)} disablePadding>
                        {appArray.map(app => (
                            <ListItem button key={app.name} classes={{ root: "Nested" }} onClick={this.props.setSelectedApp(app.name)}>
                                <ListItemText primary={app.displayName} />
                            </ListItem>
                        ))}
                    </List>
                    {/* <List component="div" disablePadding>
                        <ListItem button className={classes.nested}>
                            <ListItemIcon>
                                <StarBorder />
                            </ListItemIcon>
                            <ListItemText primary="Starred" />
                        </ListItem>
                    </List> */}
                </Collapse>

                {/* <List>
                    {appArray.map(app => (
                        <ListItem button key={app.name} onClick={this.props.setSelectedApp(app.name)}>
                            <ListItemText primary={app.displayName} />
                        </ListItem>
                    ))}
                </List> */}
            </div >
        )
    }
}

export default AppList;