import React, { ErrorInfo, ReactNode, Suspense } from "react";
import { PageError } from "../../../../widgets";

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log(error, errorInfo)
  }

  render() {
    const {hasError} = this.state
    const {children} = this.props

    if (hasError) {
      return <Suspense fallback={""}><PageError/></Suspense>
    }

    return this.props.children;
  }
}


