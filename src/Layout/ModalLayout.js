import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import PropTypes from "prop-types";

//you can pass the props to change the layout and functionality of the modal
const ModalLayout = ({
    activatorTitle,
    activatorIcon,
    primaryAction,
    modalTitle,
    modalText,
    primaryActionText,
    primaryActionStyle
}) => {

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        primaryAction();
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <Button onClick={showModal} icon={activatorIcon}>
                {activatorTitle}
            </Button>
            <Modal
                visible={isModalVisible}
                title={modalTitle}
                onOk={handleOk}
                onCancel={handleCancel}
                centered
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Cancel
                    </Button>,
                    <Button key="submit" type={primaryActionStyle} onClick={handleOk}>
                        {primaryActionText}
                    </Button>,
                ]}
            >
                <p>{modalText}</p>
            </Modal>
        </>
    );
};

ModalLayout.propTypes = {
    activatorTitle: PropTypes.string,
    activatorIcon: PropTypes.node,
    primaryAction: PropTypes.func,
    modalTitle: PropTypes.string.isRequired,
    modalText: PropTypes.string.isRequired,
    primaryActionText: PropTypes.string,
    primaryActionStyle: PropTypes.string
};

export default ModalLayout;