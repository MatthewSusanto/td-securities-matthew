import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tree } from 'antd';
import { MenuItem } from '@mui/material';
import { editResource, updateSelectedResourceID } from '../Redux/Actions/ResourceActions';
import { setViewEditType } from '../Redux/Actions/CtxMenuActions';
import { addResource, formatTreeInput, removeResource } from '../Utils/TreeUtil';
import ContextMenu from './ContextMenu';
import PropTypes from "prop-types";

//resourceProp=to render data, mainTree=determine if tree is the global tree,
const TreeView = ({
    resourceProp,
    mainTree,
    restructuringHandler,
    allowEdit
}) => {

    //redux
    const dispatch = useDispatch();
    const resourceData = useSelector((state) => state.resource.resourceData);

    //states
    const [treeData, setTreeData] = useState([]); //the current resource data for the tree
    const [contextMenu, setContextMenu] = useState(null);
    const [rightKey, setRightKey] = useState(0); //right clicked resource id
    const [selectedTreeKey, setSelectedTreeKey] = useState([]); //left clicked resource id
    const [checkedTreeKeys, setCheckedTreeKeys] = useState([]);
    const [expandedKeys, setExpandedKeys] = useState([]);

    const menuItems = () => {
        return (
            [
                <MenuItem key={1} onClick={() => addNode(rightKey)}>Add</MenuItem>,
                <MenuItem key={2} onClick={() => removeNode(rightKey)}>Remove</MenuItem>,
                mainTree && <MenuItem key={3} onClick={() => editNode()}>Edit</MenuItem>
            ]
        );
    };

    //helper functions ---------------------

    //refresh the tree structure and decide whether to save the tree structure globally or just display locally
    const updateTreeState = (inputResource) => {
        setTreeData(inputResource);
        if (mainTree === true) {
            dispatch(editResource(inputResource)); //update the global state
        } else {
            restructuringHandler(inputResource); //handling tree restructure to update locally
        }
    };

    //handler
    const handleRightClick = (key) => {
        setSelectedTreeKey([key]);
        setRightKey(key);
    };

    const handleSelect = (selectedKeys) => {
        setExpandedKeys([...expandedKeys, ...selectedKeys]); //this will automatically expand the selected node
        setSelectedTreeKey(selectedKeys);
        mainTree && dispatch(updateSelectedResourceID(selectedKeys[0]));
        dispatch(setViewEditType('view'));
    };

    const handleDragEnter = info => {
    };

    const handleCheck = (checkedKeys, info) => {
        setCheckedTreeKeys(checkedKeys.checked);
    };

    //the handler when drag and drop
    const handleOnDrop = info => {
        const dropKey = info.node.key;
        const dragKey = info.dragNode.key;
        const dropPos = info.node.pos.split('-');
        const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);
        const loop = (data, key, callback) => {
            for (let i = 0; i < data.length; i++) {
                if (data[i].key === key) {
                    return callback(data[i], i, data);
                }
                if (data[i].children) {
                    loop(data[i].children, key, callback);
                }
            }
        };

        const data = formatTreeInput(treeData, 'treeform');
        // Find dragObject
        let dragObj;
        loop(data, dragKey, (item, index, arr) => {
            arr.splice(index, 1);
            dragObj = item;
        });

        if (!info.dropToGap) {
            // Drop on the content
            loop(data, dropKey, item => {
                item.children = item.children || [];
                // where to insert
                item.children.unshift(dragObj);
            });
        } else if (
            (info.node.props.children || []).length > 0 && // Has children
            info.node.props.expanded && // Is expanded
            dropPosition === 1 // On the bottom gap
        ) {
            loop(data, dropKey, item => {
                item.children = item.children || [];
                // where to insert
                item.children.unshift(dragObj);
                // in previous version, we use item.children.push(dragObj) to insert the
                // item to the tail of the children
            });
        } else {
            let ar;
            let i;
            loop(data, dropKey, (item, index, arr) => {
                ar = arr;
                i = index;
            });
            if (dropPosition === -1) {
                ar.splice(i, 0, dragObj);
            } else {
                ar.splice(i + 1, 0, dragObj);
            }
        }
        updateTreeState(formatTreeInput(data, 'resourceform'));
    };

    const removeNode = (toDeleteID) => {
        const newResource = removeResource(toDeleteID, JSON.parse(JSON.stringify([...treeData])));
        updateTreeState(newResource);
        setContextMenu(null);
    };

    const addNode = (toAddID) => {
        const newResource = addResource([...treeData], toAddID);
        updateTreeState(newResource);
        setContextMenu(null);
        setExpandedKeys([...expandedKeys, toAddID]);
    };

    const editNode = () => {
        dispatch(updateSelectedResourceID(rightKey));
        dispatch(setViewEditType('edit'));
        setContextMenu(null);
        setExpandedKeys([...expandedKeys, rightKey]);
    };

    const handleContextMenu = (event) => {
        event.preventDefault();
        if (allowEdit) {
            setContextMenu(
                contextMenu === null
                    ? {
                        mouseX: event.clientX - 2,
                        mouseY: event.clientY - 4,
                    }
                    :
                    null,
            );
        } else {
            setContextMenu(null); //prevent to open context menu when the tree is view only
        }
    };

    useEffect(() => {
        setTreeData(resourceProp);
    }, [resourceProp, resourceData]);

    return (
        <div onContextMenu={handleContextMenu} style={{ cursor: 'context-menu', minWidth: 300, height: '100%' }}>
            <Tree
                checkable={allowEdit}
                onCheck={handleCheck}
                checkStrictly={true}
                checkedKeys={checkedTreeKeys}
                expandedKeys={expandedKeys}
                onExpand={(e) => setExpandedKeys(e)}
                selectedKeys={selectedTreeKey}
                draggable={allowEdit}
                onSelect={handleSelect}
                blockNode
                onDragEnter={handleDragEnter}
                onDrop={handleOnDrop}
                treeData={formatTreeInput(treeData, 'treeform')}
                onRightClick={(event) => handleRightClick(event.node.key)}
            />
            <ContextMenu contextMenu={contextMenu} setContextMenu={setContextMenu} menuItems={menuItems} />
        </div>
    );
};

TreeView.propTypes = {
    allowEdit: PropTypes.bool,
    resourceProp: PropTypes.array,
    mainTree: PropTypes.bool,
    restructuringHandler: PropTypes.func,
};

export default TreeView;