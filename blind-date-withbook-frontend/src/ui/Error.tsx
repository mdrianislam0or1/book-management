import { Alert } from 'antd';

interface ErrorProps {
  message: string;
}

export default function Error({ message }: ErrorProps) {
  return (
    <div className="error-container">
      <Alert
        message="Error"
        description={message}
        type="error"
        showIcon
      />
    </div>
  );
}
