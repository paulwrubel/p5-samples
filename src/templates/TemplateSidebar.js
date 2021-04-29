import React from 'react';
import { Grid, Drawer } from '@material-ui/core';
import "containers/Sidebar.css";
import InfoPanel from 'containers/panels/InfoPanel';
import TextPanel from 'containers/panels/TextPanel';

class TemplateSidebar extends React.Component {
    render() {
        return (
            <div className="Sidebar">
                <Drawer
                    className="SidebarDrawer"
                    variant="persistent"
                    open={this.props.isControlsPanelOpen}>
                    <Grid
                        className="SidebarGrid"
                        container
                        spacing={2}
                        direction="column"
                        wrap="nowrap">
                        <Grid item xs>
                            <TextPanel
                                body={this.props.app.description}
                            />
                        </Grid>
                        <Grid item xs>
                            <InfoPanel
                                info={Array.from(this.props.information, ([key, value]) => ({
                                    key: key,
                                    text: value,
                                }))}
                            />
                        </Grid>
                    </Grid>
                </Drawer>
            </div>
        );
    }
}

export default TemplateSidebar;