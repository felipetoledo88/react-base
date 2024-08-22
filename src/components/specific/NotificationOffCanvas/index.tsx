import React, { useState, useEffect } from 'react';
import { Button, Offcanvas, Tabs, Tab, ListGroup, Badge, Container, Row, Col, Placeholder } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell as farBell, faEnvelope, faCogs, faAd } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import './style.css';
import api from '../../../services/api';
import { DateTime } from 'luxon';

interface User {
    id: number;
    name: string;
    profileImage: string;
}

interface Notification {
    id: number;
    message: string;
    time: string;
    typeId: number;
    view: number;
    link: string; // Novo campo para o link de redirecionamento
    user: User;
}

interface NotificationType {
    id: number;
    name: string;
}

const NotificationOffCanvas: React.FC = () => {
    const navigate = useNavigate();
    const [show, setShow] = useState<boolean>(false);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [notificationTypes, setNotificationTypes] = useState<NotificationType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const storedNotifications = sessionStorage.getItem('notifications');
        const storedNotificationTypes = sessionStorage.getItem('notificationTypes');

        if (storedNotifications && storedNotificationTypes) {
            setNotifications(JSON.parse(storedNotifications));
            setNotificationTypes(JSON.parse(storedNotificationTypes));
            setLoading(false);
        } else {
            fetchNotifications();
        }
    }, []);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const fetchNotifications = async () => {
        try {
            const response = await api.get<{ notifications: Notification[], notificationTypes: NotificationType[] }>('/notifications');
            setNotifications(response.data.notifications);
            setNotificationTypes(response.data.notificationTypes);

            // Armazena os dados no sessionStorage
            sessionStorage.setItem('notifications', JSON.stringify(response.data.notifications));
            sessionStorage.setItem('notificationTypes', JSON.stringify(response.data.notificationTypes));
        } catch (error) {
            console.error('Erro ao buscar notificações:', error);
        } finally {
            setLoading(false);
        }
    };

    const renderPlaceholder = () => (
        <ListGroup.Item>
            <Container>
                <Row className="align-items-center">
                    <Col xs="auto">
                        <Placeholder as="div" animation="glow">
                            <Placeholder className="rounded-circle" style={{ width: '40px', height: '40px' }} />
                        </Placeholder>
                    </Col>
                    <Col>
                        <Placeholder as="div" animation="glow">
                            <Placeholder xs={6} />
                        </Placeholder>
                        <Placeholder as="div" animation="glow">
                            <Placeholder xs={4} />
                        </Placeholder>
                        <Placeholder as="div" animation="glow">
                            <Placeholder xs={8} />
                        </Placeholder>
                    </Col>
                </Row>
            </Container>
        </ListGroup.Item>
    );

    const formatDateTime = (time: string) => {
        return DateTime.fromISO(time).toLocaleString(DateTime.DATETIME_MED);
    };

    const getIcon = (typeName: string) => {
        switch (typeName) {
            case 'message':
                return faEnvelope;
            case 'sponsored':
                return faAd;
            case 'system':
                return faCogs;
            default:
                return farBell;
        }
    };

    const handleNotificationClick = (link: string) => {
        handleClose(); // Fechar o Offcanvas
        setTimeout(() => {
            if (link.startsWith('https')) {
                window.open(link, '_blank'); // Para links externos, use window.open com _blank
            } else {
                navigate(link); // Para links internos, use navigate
            }
        }, 300); // Aguarde 300ms antes de navegar
    };

    return (
        <>
            <Button variant="light" className="position-relative" onClick={handleShow}>
                <FontAwesomeIcon icon={farBell} />
                {notifications.length > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {notifications.length}
                    </span>
                )}
            </Button>

            <Offcanvas show={show} onHide={handleClose} placement="end" className="off-notify">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Notificações</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Tabs defaultActiveKey="all" id="notification-tabs" className="mb-3 d-flex justify-content-start flex-row notification-tabs">
                        <Tab eventKey="all" title={
                            <>
                                <FontAwesomeIcon icon={farBell} />
                                {notifications.length > 0 && <Badge bg="primary" className="ms-2">{notifications.length}</Badge>}
                            </>
                        }>
                            <ListGroup variant="flush">
                                {loading ? (
                                    [...Array(5)].map((_, index) => renderPlaceholder())
                                ) : (
                                    notifications.map(notification => (
                                        <ListGroup.Item key={notification.id} className={`notification-item ${notification.view === 0 ? 'unviewed' : ''}`} onClick={() => handleNotificationClick(notification.link)}>
                                            <Container>
                                                <Row className="align-items-center">
                                                    <Col xs="auto">
                                                        <img
                                                            src={notification.user.profileImage}
                                                            alt="profile"
                                                            className={`rounded-circle ${notification.typeId !== 1 ? 'rounded-5' : ''}`}
                                                        />
                                                    </Col>
                                                    <Col className="notification-text">
                                                        <div className='d-flex justify-content-between'>
                                                            <strong>{notification.user.name}</strong>
                                                            {notification.typeId === 2 ? (
                                                                <Badge bg="warning">Parceiro</Badge>
                                                            ) : notification.typeId === 3 && (
                                                                <Badge bg="secondary">Sistema</Badge>
                                                            )}
                                                        </div>
                                                        <div>{notification.message}</div>
                                                        <div className="text-muted small notification-time">{formatDateTime(notification.time)}</div>
                                                        <span className={`circle-notify ${notification.view === 1 ? 'hidden' : ''}`}></span>
                                                    </Col>
                                                </Row>
                                            </Container>
                                        </ListGroup.Item>
                                    ))
                                )}
                            </ListGroup>
                        </Tab>
                        {notificationTypes.map(type => (
                            <Tab eventKey={type.name} key={type.id} title={
                                <>
                                    <FontAwesomeIcon icon={getIcon(type.name)} />
                                    {notifications.filter(notification => notification.typeId === type.id).length > 0 &&
                                        <Badge bg="primary" className="ms-2">{notifications.filter(notification => notification.typeId === type.id).length}</Badge>}
                                </>
                            }>
                                <ListGroup variant="flush">
                                    {loading ? (
                                        [...Array(5)].map((_, index) => renderPlaceholder())
                                    ) : (
                                        notifications.filter(notification => notification.typeId === type.id).map(notification => (
                                            <ListGroup.Item key={notification.id} className={`notification-item ${notification.view === 0 ? 'unviewed' : ''}`} onClick={() => handleNotificationClick(notification.link)}>
                                                <Container>
                                                    <Row className="align-items-center">
                                                        <Col xs="auto">
                                                            <img
                                                                src={notification.user.profileImage}
                                                                alt="profile"
                                                                className={`rounded-circle ${notification.typeId !== 1 ? 'rounded-5' : ''}`}
                                                            />
                                                        </Col>
                                                        <Col className="notification-text">
                                                            <div className='d-flex justify-content-between'>
                                                                <strong>{notification.user.name}</strong>
                                                                {notification.typeId === 2 ? (
                                                                    <Badge bg="warning">Parceiro</Badge>
                                                                ) : notification.typeId === 3 && (
                                                                    <Badge bg="secondary">Sistema</Badge>
                                                                )}
                                                            </div>
                                                            <div>{notification.message}</div>
                                                            <div className="text-muted small notification-time">{formatDateTime(notification.time)}</div>
                                                            <span className={`circle-notify ${notification.view === 1 ? 'hidden' : ''}`}></span>
                                                        </Col>
                                                    </Row>
                                                </Container>
                                            </ListGroup.Item>
                                        ))
                                    )}
                                </ListGroup>
                            </Tab>
                        ))}
                    </Tabs>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};

export default NotificationOffCanvas;