import React from 'react';
import Menu from '@mui/material/Menu';
import PropTypes from "prop-types";

const ContextMenu = ({
    contextMenu,
    setContextMenu,
    menuItems
}) => {

    const handleClose = () => {
        setContextMenu(null);
    };

    return (
        <Menu
            open={contextMenu !== null}
            onClose={handleClose}
            anchorReference="anchorPosition"
            anchorPosition={
                contextMenu !== null
                    ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
                    : undefined
            }
        >
            {menuItems()}
        </Menu>
    );
};

ContextMenu.propTypes = {
    contextMenu: PropTypes.object,
    setContextMenu: PropTypes.func.isRequired,
    menuItems: PropTypes.func.isRequired,
};

export default ContextMenu;