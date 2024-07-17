// components/QRCode.tsx
import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

interface QRCodeProps {
    value: string;
    size?: number;
    bgColor?: string;
    fgColor?: string;
    level?: 'L' | 'M' | 'Q' | 'H';
}

const QRCode: React.FC<QRCodeProps> = ({
                                           value,
                                           size = 180,
                                           bgColor = '#ffffff',
                                           fgColor = '#000000',
                                           level = 'L',
                                       }) => {
    return (
        <div className="flex justify-center items-center">
            <div className="p-1 bg-gray-100 rounded-lg shadow-md">
                <div className="bg-white p-2">
                    <QRCodeSVG
                        value={value}
                        size={size}
                        bgColor={bgColor}
                        fgColor={fgColor}
                        level={level}
                    />
                </div>
            </div>
        </div>
    );
};

export default QRCode;
