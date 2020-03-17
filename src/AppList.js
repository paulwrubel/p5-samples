import React from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core';
import "./AppList.css"
class AppList extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

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
                onClick={this.props.toggleDrawer(false)}>
                <List>
                    {appArray.map(app => (
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