import React from 'react';
import Alert, {AlertProps} from 'react-bootstrap/Alert'
import {ErrorAlert} from "chums-components";
import {Badge} from "react-bootstrap";
import numeral from "numeral";

export interface ContextAlertProps extends Pick<ErrorAlert, 'context'|'count'>, AlertProps {
    children?: React.ReactNode;
}

export default function ContextAlert({context, count, children, ...alertProps}: ContextAlertProps) {
    return (
        <Alert {...alertProps}>
            {!!context && (
                <Alert.Heading>
                    {context}
                    {count > 1 && (
                        <Badge color={alertProps.color} className="ms-1">{numeral(count).format('0,0')}</Badge>
                    )}
                </Alert.Heading>
            )}
            {children}
        </Alert>
    )
}
