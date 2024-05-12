import React, { useState, useEffect } from 'react';
import { Upload, message, Image } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';

interface UploadImageButtonProps {
    imageUrl?: string;
    onImageUpload?: (url: string) => void;
    disabled?: boolean;
}

const getBase64 = (img: File, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
};

const beforeUpload = (file: File) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must be smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
};

const UploadImageButton: React.FC<UploadImageButtonProps> = ({ imageUrl, onImageUpload, disabled }) => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(false);
    }, [imageUrl, disabled]);

    const handleChange: UploadProps['onChange'] = (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            getBase64(info.file.originFileObj as File, (url) => {
                setLoading(false);
                onImageUpload && onImageUpload(url);
            });
        }
    };

    const noImage = (
        <p>Ship has no Image</p>
    );

    return (
        <Upload
            name="avatar"
            listType="picture"
            className="avatar-uploader"
            showUploadList={false}
            action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
            beforeUpload={beforeUpload}
            onChange={handleChange}
            disabled={disabled}
        >
            {loading ? (
                <LoadingOutlined style={{ fontSize: 24, alignContent: 'center' }} />
            ) : (
                imageUrl ? (
                    <Image
                        width={200}
                        height={300}
                        src={imageUrl}
                        preview={false}
                        style={{ borderRadius: '4px', border: '2px solid #000000' }}
                    />
                ) : (
                    noImage
                )
            )}
        </Upload>
    );
};

export default UploadImageButton;