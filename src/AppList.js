import React from 'react';
import { List, ListItem, ListItemText, Typography } from '@material-ui/core';
import "./AppList.css"
class AppList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div 
                className="AppList"
                role="presentation"
                onClick={this.props.toggleDrawer(false)}>
                <List>
                    {Array.from(this.props.apps.values()).map(app => (
                        <ListItem button key={app.name} onClick={this.props.setSelectedApp(app.name)}>
                            <ListItemText primary={app.displayName}/>
                        </ListItem>
                    ))}
                </List>
            </div>
        )
    }
}

export default AppList;