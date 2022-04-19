import React, { useEffect, useRef, useState } from 'react';
import { Form, Input, Button, Card, Divider, Typography, Space, Row, Tag } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import TreeView from './TreeView';
import { CloseOutlined, SaveFilled, PlusOutlined, EditFilled } from '@ant-design/icons';
import { editResource } from '../Redux/Actions/ResourceActions';
import { addResource, getResource, removeResource, updateResource } from '../Utils/TreeUtil';
import ModalLayout from '../Layout/ModalLayout';
const { Title, Text } = Typography;
const { TextArea } = Input;

const ResourceCard = () => {

    // redux
    const dispatch = useDispatch();
    const globalResourceData = useSelector((state) => state.resource.resourceData);
    const selectedResourceID = useSelector((state) => state.resource.selectedResourceID);
    const viewEditType = useSelector((state) => state.global.viewEditType);

    // states
    const [editForm, setEditForm] = useState(false);
    const [currentResource, setCurrentResource] = useState({});
    const [userInput, setUserInput] = useState('');
    const { name,
        id,
        description,
        displayName,
        type,
        clientId,
        users,
        resourceList } = currentResource; //destructured for cleaner code
    // design
    const [form] = Form.useForm();
    const userInputElement = useRef(null);

    // handlers ------------------

    // the main handle to change current resource
    const currentResourceHandler = (e, type) => {
        setCurrentResource({
            ...currentResource, [type]: e.target.value
        });
    };

    // handler that will handle the current resource's resourceelist
    const restructuringHandler = (e) => {
        setCurrentResource({
            ...currentResource, resourceList: e
        });
    };

    // user text input handler
    const handleUserInput = (e) => {
        setUserInput(e.target.value);
    };
    const removeUser = (user) => {
        let currentUsers = users.filter((name) => name !== user);
        setCurrentResource({
            ...currentResource, users: currentUsers
        });
    };
    const addUser = () => {
        let currentUsers = users;
        let toAdd = userInput;
        setCurrentResource({
            ...currentResource, users: [...currentUsers, toAdd]
        });
        setUserInput('');
        userInputElement.current.focus();
    };

    // will update the current resource and save it globally
    const handleSave = () => {
        const newResources = updateResource(JSON.parse(JSON.stringify([...globalResourceData])), id, currentResource);
        dispatch(editResource(newResources));
    };

    // will delete the current resource globally
    const handleDelete = () => {
        const tempid = id;
        const newResources = removeResource(tempid, JSON.parse(JSON.stringify([...globalResourceData])));
        dispatch(editResource(newResources));
    };

    // add a resourcelist
    const handleAddResourceList = () => {
        let toAddResource = addResource(resourceList, 0);
        setCurrentResource({ ...currentResource, resourceList: toAddResource });
    };

    // this will initialize value with the currently selected resource, and whether to view or edit the resource
    // will also automatically update the current selected resource value when the global state is modified
    useEffect(() => {
        let toShowResource = getResource(JSON.parse(JSON.stringify([...globalResourceData])), selectedResourceID);
        setCurrentResource(toShowResource);
        viewEditType === 'view' ? setEditForm(false) : setEditForm(true);
    }, [globalResourceData, selectedResourceID, viewEditType]);

    return (<>
        {id && <Card style={{ width: 500 }}>
            <Row justify='space-between' align="top">
                <div>
                    <Title level={3}>{name}</Title>
                    <Text type="secondary">#{id}</Text>
                </div>
                <Space>
                    <ModalLayout
                        activatorIcon={<CloseOutlined />}
                        modalTitle={"Confirm Delete"}
                        modalText={"You have selected to delete this resource. If this is the action that you wanted to do, please confirm your choice."}
                        primaryAction={() => handleDelete()}
                        primaryActionText={"Delete"}
                        primaryActionStyle={"danger"}
                    />

                    {editForm ?
                        <ModalLayout
                            activatorIcon={<SaveFilled />}
                            modalTitle={"Confirm Update"}
                            modalText={"You have selected to update this resource. If this is the action that you wanted to do, please confirm your choice."}
                            primaryAction={() => handleSave()}
                            primaryActionText={"Update"}
                            primaryActionStyle={"primary"}
                        />
                        : <Button
                            icon={<EditFilled />}
                            onClick={() => setEditForm(!editForm)}
                        />}
                </Space>
            </Row>

            <Divider />

            <Form
                layout="vertical"
                form={form}
                initialValues={{
                    layout: 'vertical',
                }}
            >
                <Form.Item label="Resource Name:">
                    {editForm ? <Input onChange={(e) => currentResourceHandler(e, 'name')} placeholder="Enter the Resource Name" value={name} /> : <div>{name}</div>}
                </Form.Item>

                <Form.Item label="Description:">
                    {editForm ? <TextArea onChange={(e) => currentResourceHandler(e, 'description')} rows={4} placeholder="Enter the description" value={description} /> : <div>{description}</div>}
                </Form.Item>

                <Form.Item label="Display Name:">
                    {editForm ? <Input onChange={(e) => currentResourceHandler(e, 'displayName')} placeholder="Enter the display name" value={displayName} /> : <div>{displayName}</div>}
                </Form.Item>

                <Form.Item label="Type:">
                    {editForm ? <Input onChange={(e) => currentResourceHandler(e, 'type')} placeholder="Enter the type" value={type} /> : <div>{type}</div>}
                </Form.Item>

                <Form.Item label="Client ID:">
                    {editForm ? <Input onChange={(e) => currentResourceHandler(e, 'clientId')} placeholder="Enter the client ID" value={clientId} /> : <div>{clientId}</div>}
                </Form.Item>

                <Form.Item label="Users:">
                    {editForm && <Input.Group compact style={{ marginBottom: "1rem" }}>
                        <Input
                            ref={userInputElement}
                            style={{ width: '80%' }}
                            type="text"
                            className="tag-input"
                            value={userInput}
                            onChange={handleUserInput}
                            onPressEnter={() => addUser()}
                        />
                        <Button
                            style={{ width: '20%' }}
                            icon={<PlusOutlined />}
                            onClick={() => addUser()}
                        />
                    </Input.Group>}

                    <Space wrap={true}>
                        {users && users.map((user) => {
                            return (<Tag key={user} closable={editForm} onClose={() => removeUser(user)}>
                                {user}
                            </Tag>);
                        })}
                    </Space>
                </Form.Item>

                <Row justify='space-between' align="top">
                    <Form.Item label="Resource List:">
                        {resourceList && <TreeView resourceProp={resourceList} allowEdit={editForm} mainTree={false} restructuringHandler={restructuringHandler} />}
                    </Form.Item>
                    {editForm && <Button
                        icon={<PlusOutlined />}
                        onClick={() => handleAddResourceList()}
                    />}
                </Row>
            </Form>
        </Card>}
    </>
    );
};

export default ResourceCard;