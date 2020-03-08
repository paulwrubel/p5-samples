import React from 'react';
// import './SketchSelector.css';
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography"
import withStyles from "@material-ui/core/styles/withStyles"
import "./MenuBar.css"
import { AppBar, Toolbar, IconButton, Drawer } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AppList from 'AppList';

class MenuBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            drawerIsOpen: false
        };

        this.toggleDrawer = this.toggleDrawer.bind(this);
    }

    toggleDrawer(newValue) {
        return event => {
            if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
                return;
            }
            this.setState({
                drawerIsOpen: newValue
            });
        };
    }

    render() {
        return (
            <div className="MenuBar">
                <AppBar position="static">
                    <Toolbar variant="dense" className="Toolbar">
                        <IconButton edge="start" onClick={this.toggleDrawer(true)}>
                            <MenuIcon />
                        </IconButton>
                        <Drawer open={this.state.drawerIsOpen} onClose={this.toggleDrawer(false)}>
                            <AppList 
                                apps={this.props.apps}
                                toggleDrawer={this.toggleDrawer}
                                setSelectedApp={this.props.setSelectedApp}/>
                        </Drawer>
                        <Typography variant="h5" className="SelectedName">
                            {this.props.selectedApp.displayName}
                        </Typography>
                        <Typography variant="body2" className="SelectedVersion">
                            v{this.props.selectedApp.version}
                        </Typography>
                        <Typography variant="body1" className="SelectedDescription Grow">
                            {this.props.selectedApp.description}
                        </Typography>
                        {/* <div className="Grow" /> */}
                        <Typography variant="body2" className="AppInfo">
                            {`
                            ${this.props.appName} 
                            v${this.props.appVersion}
                            `}
                        </Typography>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default MenuBar;