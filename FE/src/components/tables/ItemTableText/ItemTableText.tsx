import React from 'react';

interface ItemTableTextProps {
    text?: string; // Make text property optional
}

const ItemTableText: React.FC<ItemTableTextProps> = ({ text }) => (
    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={text}>
        {text && text.length > 17 ? `${text.slice(0, 17)}...` : text}
    </span>
);

export default ItemTableText;
