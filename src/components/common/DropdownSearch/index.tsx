import React, { useState, ChangeEvent, useEffect, useRef } from 'react';
import { Form, Dropdown, InputGroup, FormControl, Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import './style.css'; // Certifique-se de criar e importar um arquivo CSS para estilos personalizados
import { DateTime } from 'luxon';
import api from '../../../services/api';

interface User {
    id: number;
    name: string;
    profileImage: string;
}

interface Message {
    id: number;
    content: string;
    time: string;
    user: User;
}

interface SearchResult {
    messages: Message[];
    users: User[];
}

const DropdownSearch: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [searchResults, setSearchResults] = useState<SearchResult>({ messages: [], users: [] });
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const searchRef = useRef<HTMLDivElement>(null);

    const checkFocusState = () => {
        setIsFocused(searchTerm.length > 0);
    };

    useEffect(() => {
        if (searchTerm.length > 0) {
            const fetchData = async () => {
                const response = await api.get<SearchResult>(`/search?query=${searchTerm}`);
                setSearchResults(response.data);
                setShowDropdown(true);
            };
            fetchData();
        } else {
            setSearchResults({ messages: [], users: [] });
            setShowDropdown(false);
        }
        checkFocusState();
    }, [searchTerm]);

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        checkFocusState();
    };

    const handleSelectItem = (item: Message | User) => {
        console.log('Selecionado:', item);
        setSearchTerm('');
        setShowDropdown(false);
        setIsFocused(false);
    };

    const formatDateTime = (time: string) => {
        return DateTime.fromISO(time).toLocaleString(DateTime.DATETIME_MED);
    };

    const handleFocus = () => {
        checkFocusState();
    };

    const handleBlur = (e: MouseEvent) => {
        if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
            setIsFocused(false);
            setShowDropdown(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleBlur);
        return () => {
            document.removeEventListener('mousedown', handleBlur);
        };
    }, []);

    return (
        <>
            {isFocused && <div className="search-overlay active" onClick={() => { setIsFocused(false); setShowDropdown(false); }}></div>}
            <div className={`me-auto search-container ${isFocused ? 'focused' : ''}`} style={{ width: "50%", position: "relative" }} ref={searchRef}>
                <Form className="d-flex me-auto search-bar" style={{ width: '100%', maxWidth: '560px' }}>
                    <InputGroup>
                        <InputGroup.Text>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </InputGroup.Text>
                        <FormControl
                            type="text"
                            placeholder="Buscar mensagens ou contatos"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            onFocus={handleFocus}
                            className='magnifying-glass'
                        />
                    </InputGroup>
                    {showDropdown && (
                        <Dropdown.Menu className='search-dropdown' show style={{ width: '100%' }}>
                            {searchResults.users.length === 0 && searchResults.messages.length === 0 ? (
                                <Dropdown.Item className="text-center">
                                    Nenhum resultado encontrado
                                </Dropdown.Item>
                            ) : (
                                <>
                                    {searchResults.users.length > 0 && (
                                        <>
                                            <Dropdown.Header className="dropdown-header-custom">Usuários</Dropdown.Header>
                                            {searchResults.users.map((user) => (
                                                <Dropdown.Item key={user.id} onClick={() => handleSelectItem(user)} className="d-flex align-items-center">
                                                    <Container>
                                                        <Row>
                                                            <Col xs="auto">
                                                                <img
                                                                    src={user.profileImage}
                                                                    alt={user.name}
                                                                    className="rounded-circle"
                                                                    style={{ width: '40px', height: '40px' }}
                                                                />
                                                            </Col>
                                                            <Col>
                                                                <strong>{user.name}</strong>
                                                            </Col>
                                                        </Row>
                                                    </Container>
                                                </Dropdown.Item>
                                            ))}
                                        </>
                                    )}
                                    {searchResults.messages.length > 0 && (
                                        <>
                                            <Dropdown.Header className="dropdown-header-custom">Mensagens</Dropdown.Header>
                                            {searchResults.messages.map((message) => (
                                                <Dropdown.Item key={message.id} onClick={() => handleSelectItem(message)} className="d-flex align-items-center">
                                                    <Container>
                                                        <Row>
                                                            <Col xs="auto">
                                                                <img
                                                                    src={message.user.profileImage}
                                                                    alt={message.user.name}
                                                                    className="rounded-circle"
                                                                    style={{ width: '40px', height: '40px' }}
                                                                />
                                                            </Col>
                                                            <Col>
                                                                <strong>{message.user.name}</strong>
                                                                <div>{message.content}</div>
                                                                <div className="text-muted small">{formatDateTime(message.time)}</div>
                                                            </Col>
                                                        </Row>
                                                    </Container>
                                                </Dropdown.Item>
                                            ))}
                                        </>
                                    )}
                                </>
                            )}
                        </Dropdown.Menu>
                    )}
                </Form>
            </div>
        </>
    );
};

export default DropdownSearch;