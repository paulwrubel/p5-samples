import React from 'react';
import "./MenuBar.css";
import { Typography, AppBar, Toolbar, IconButton, Drawer, Tooltip } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import AppList from './AppList';

class MenuBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isMenuDrawerOpen: false
        };

        this.handleMenuButtonToggle = this.handleMenuButtonToggle.bind(this);
    }

    handleMenuButtonToggle(newValue) {
        return event => {
            if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
                return;
            }
            this.setState({
                isMenuDrawerOpen: newValue
            });
        };
    }

    render() {
        let creationDate = new Date(this.props.selectedApp.creationDate);
        return (
            <div className="MenuBar">
                <AppBar position="static">
                    <Toolbar variant="dense" className="Toolbar">
                        {this.props.isControlsPanelOpen &&
                            <Tooltip title="Collapse Controls">
                                <IconButton edge="start" onClick={this.props.onControlsPanelToggle(false)}>
                                    <ArrowBackIcon
                                        className="AppBarButton" />
                                </IconButton>
                            </Tooltip>
                        }{!this.props.isControlsPanelOpen &&
                            <Tooltip title="Expand Controls">
                                <IconButton edge="start" onClick={this.props.onControlsPanelToggle(true)}>
                                    <ArrowForwardIcon
                                        className="AppBarButton" />
                                </IconButton>
                            </Tooltip>
                        }
                        <Typography variant="h5" className="SelectedName">
                            {this.props.selectedApp.displayName}
                        </Typography>
                        <Typography variant="body2" className="SelectedVersion">
                            v{this.props.selectedApp.version}
                        </Typography>
                        <Typography variant="body1" className="SelectedDescription Grow">
                            {this.props.selectedApp.description} ({creationDate.getFullYear()})
                        </Typography>
                        {/* <div className="Grow" /> */}
                        <Typography variant="body2" className="AppInfo">
                            {`
                            ${this.props.appName} 
                            v${this.props.appVersion}
                            `}
                        </Typography>
                        <Tooltip title="Open Menu">
                            <IconButton edge="end" onClick={this.handleMenuButtonToggle(true)}>
                                <MenuIcon
                                    className="AppBarButton" />
                            </IconButton>
                        </Tooltip>
                    </Toolbar>
                </AppBar>
                <Drawer
                    open={this.state.isMenuDrawerOpen}
                    onClose={this.handleMenuButtonToggle(false)}
                    anchor="right">
                    <AppList
                        apps={this.props.apps}
                        toggleDrawer={this.handleMenuButtonToggle}
                        setSelectedApp={this.props.setSelectedApp} />
                </Drawer>
            </div>
        );
    }
}

export default MenuBar;