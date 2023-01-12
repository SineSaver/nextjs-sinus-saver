import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {IconDefinition,} from '@fortawesome/free-regular-svg-icons'
import {faChevronUp, faGauge, faHeartPulse, faMap,} from '@fortawesome/free-solid-svg-icons'
import React, {PropsWithChildren, useContext, useEffect, useState,} from 'react'
import {Accordion, AccordionContext, Badge, Button, Nav, useAccordionButton,} from 'react-bootstrap'
import classNames from 'classnames'
import Link from 'next/link'
import {IDevice} from "../../../../model/device";

type SidebarNavItemProps = {
    href: string;
    icon?: IconDefinition;
} & PropsWithChildren

const SidebarNavItem = (props: SidebarNavItemProps) => {
    const {
        icon,
        children,
        href,
    } = props

    return (
        <Nav.Item>
            <Link href={href} passHref legacyBehavior>
                <Nav.Link className="px-3 py-2 d-flex align-items-center">
                    {icon ? <FontAwesomeIcon className="nav-icon ms-n3" icon={icon}/>
                        : <span className="nav-icon ms-n3"/>}
                    {children}
                </Nav.Link>
            </Link>
        </Nav.Item>
    )
}

const SidebarNavTitle = (props: PropsWithChildren) => {
    const {children} = props

    return (
        <li className="nav-title px-3 py-2 mt-3 text-uppercase fw-bold">{children}</li>
    )
}

type SidebarNavGroupToggleProps = {
    eventKey: string;
    icon: IconDefinition;
    setIsShow: (isShow: boolean) => void;
} & PropsWithChildren

const SidebarNavGroupToggle = (props: SidebarNavGroupToggleProps) => {
    // https://react-bootstrap.github.io/components/accordion/#custom-toggle-with-expansion-awareness
    const {activeEventKey} = useContext(AccordionContext)
    const {
        eventKey, icon, children, setIsShow,
    } = props

    const decoratedOnClick = useAccordionButton(eventKey)

    const isCurrentEventKey = activeEventKey === eventKey

    useEffect(() => {
        setIsShow(activeEventKey === eventKey)
    }, [activeEventKey, eventKey, setIsShow])

    return (
        <Button
            variant="link"
            type="button"
            className={classNames('rounded-0 nav-link px-3 py-2 d-flex align-items-center flex-fill w-100 shadow-none', {
                collapsed: !isCurrentEventKey,
            })}
            onClick={decoratedOnClick}
        >
            <FontAwesomeIcon className="nav-icon ms-n3" icon={icon}/>
            {children}
            <div className="nav-chevron ms-auto text-end">
                <FontAwesomeIcon size="xs" icon={faChevronUp}/>
            </div>
        </Button>
    )
}

type SidebarNavGroupProps = {
    toggleIcon: IconDefinition;
    toggleText: string;
} & PropsWithChildren

const SidebarNavGroup = (props: SidebarNavGroupProps) => {
    const {
        toggleIcon,
        toggleText,
        children,
    } = props

    const [isShow, setIsShow] = useState(false)

    return (
        <Accordion as="li" bsPrefix="nav-group" className={classNames({show: isShow})}>
            <SidebarNavGroupToggle icon={toggleIcon} eventKey="0"
                                   setIsShow={setIsShow}>{toggleText}</SidebarNavGroupToggle>
            <Accordion.Collapse eventKey="0">
                <ul className="nav-group-items list-unstyled">
                    {children}
                </ul>
            </Accordion.Collapse>
        </Accordion>
    )
}

type SidebarNavProps = {
    devices: IDevice[]
}

export default function SidebarNav(props: SidebarNavProps) {
    return (
        <ul className="list-unstyled">
            <SidebarNavItem icon={faGauge} href="/">
                Dashboard
                <small className="ms-auto"><Badge bg="info" className="ms-auto">NEW</Badge></small>
            </SidebarNavItem>
            <SidebarNavTitle>Übersicht</SidebarNavTitle>
            <SidebarNavItem icon={faMap} href="/map">Map</SidebarNavItem>
            <SidebarNavGroup toggleIcon={faHeartPulse} toggleText="Geräte">
                {props.devices.map((device) => <SidebarNavItem key={device.id}
                                                               href={`/devices/${device.id}`}>{device.id}</SidebarNavItem>)}
            </SidebarNavGroup>
        </ul>
    )
}
