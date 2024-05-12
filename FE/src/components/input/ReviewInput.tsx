import TextArea from 'antd/lib/input/TextArea';
import React, { useState } from 'react';

const ReviewInput: React.FC = () => {
    const [value, setValue] = useState<string>('');

    return (
        <TextArea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Nhận xét nếu có..."
            autoSize={{ minRows: 3, maxRows: 3 }}
        />
    );
};

export default ReviewInput;
