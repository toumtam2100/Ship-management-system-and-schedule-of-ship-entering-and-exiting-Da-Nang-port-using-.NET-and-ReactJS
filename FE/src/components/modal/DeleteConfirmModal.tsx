import React from 'react';
import { Modal, message } from 'antd';

interface DeleteConfirmModalProps<T> {
    visible: boolean;
    record: T | null;
    onCancel: () => void;
    onConfirm: () => void;
    getTitle: (record: T | null) => string; // Add a function to get the title
}

const DeleteConfirmModal = <T,>({
    visible,
    record,
    onCancel,
    onConfirm,
    getTitle,
}: DeleteConfirmModalProps<T>) => {
    const handleOk = () => {
        onConfirm();
        if (record) {
            message.success(`${getTitle(record)} đã được khóa.`);
        }
    };

    return (
        <Modal
            title={`Xác nhận xóa ${getTitle(record)}?`} 
            visible={visible}
            onOk={handleOk}
            onCancel={onCancel}
            okText="Xác nhận"
            cancelText="Hủy"
            okType="danger"
        >
            <p>{`Bạn có muốn khóa ${getTitle(record)}?`}</p>
        </Modal>
    );
};

export default DeleteConfirmModal;