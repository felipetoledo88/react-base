import React from 'react';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style.css';

type SButtonProps = {
    icon?: any;
    className?: string;
    variant?: string;
    type?: any;
    text?: string;
    title?: string;
    loader?: boolean;
    onClick?: () => void; // Adiciona a propriedade onClick
};


const SButton: React.FC<SButtonProps> = ({ className = '', variant = '', type = '', icon = null, text = '', title = '', loader = false, onClick }) => {
    const buttonContent = (
        <>
            {loader != false ? (
                icon && <div className="spinner"></div>
            ) : (
                icon && <FontAwesomeIcon icon={icon} className="me-2" />
            )}
            {text}
        </>
    );

    return title ? (
        <OverlayTrigger
            placement="top"
            overlay={
                <Tooltip id="button-tooltip">
                    {title}
                </Tooltip>
            }
        >
            <Button variant={variant} type={type} className={`scraper-btn w-100 ${className}`} disabled={loader} onClick={onClick}>
                {buttonContent}
            </Button>
        </OverlayTrigger>
    ) : (
        <Button variant={variant} type={type} className={`scraper-btn w-100 ${className}`} disabled={loader} onClick={onClick}>
            {buttonContent}
        </Button>
    );
};

export default SButton;
