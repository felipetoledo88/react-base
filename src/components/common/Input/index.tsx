import React from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style.css';

type FormInputGroupProps = {
    type?: string;
    placeholder?: string;
    icon?: any;
    className?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input: React.FC<FormInputGroupProps> = ({ className, type, placeholder, icon, value, onChange }) => {
    return (
        <Form.Group className={`${icon ? 'scraper-input' : 'scraper-input-border'  } scraper-input-primary ${className}`}>
            <InputGroup>
                {icon ? (
                    <>
                        <InputGroup.Text style={{ background: 'transparent' }}>
                            <FontAwesomeIcon icon={icon} />
                        </InputGroup.Text>
                        <Form.Control type={type} placeholder={placeholder} value={value} onChange={onChange} style={{ borderLeft: 'none' }}/>
                    </>
                ) : (
                    <Form.Control type={type} placeholder={placeholder} value={value} onChange={onChange}/>
                )}
            </InputGroup>
        </Form.Group>
    );
};

export default Input;
