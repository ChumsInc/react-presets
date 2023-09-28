import React from 'react';
import {FallbackProps} from "react-error-boundary";
import {Alert} from "chums-components";

export default function ErrorBoundaryFallbackAlert({error, resetErrorBoundary}: FallbackProps) {
    return (
        <Alert color="danger" canDismiss onDismiss={resetErrorBoundary}>
            <strong>Something went wrong!</strong>
            <div className="text-light">
                {error.message}
            </div>
        </Alert>
    )
}
