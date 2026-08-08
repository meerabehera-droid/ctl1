
import React from 'react';

export interface EmailData {
  id: string;
  from: string;
  to: string;
  subject: string;
  body: string;
  timestamp: Date;
  actions?: {
    onApprove: () => void;
    onReject: () => void;
    label: string;
  };
}

interface EmailToastProps {
  emails: EmailData[];
  onDismiss: (id: string) => void;
}

const EmailToast: React.FC<EmailToastProps> = ({ emails, onDismiss }) => {
  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-4 max-w-md w-full">
      {emails.map((email) => (
        <div 
          key={email.id}
          className="bg-white border-l-4 border-blue-600 shadow-2xl rounded-lg overflow-hidden animate-slide-up"
        >
          <div className="bg-blue-50 px-4 py-2 border-b flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-bold text-blue-800 uppercase tracking-wider">Email Sent (Trial Simulation)</span>
            </div>
            <button 
              onClick={() => onDismiss(email.id)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="p-4">
            <div className="text-xs space-y-1 mb-3 text-gray-500">
              <p><strong>From:</strong> {email.from}</p>
              <p><strong>To:</strong> {email.to}</p>
              <p><strong>Subject:</strong> {email.subject}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded text-sm text-gray-700 whitespace-pre-wrap italic border border-gray-100 mb-4">
              {email.body}
            </div>
            
            {email.actions && (
              <div className="flex gap-2 mt-2">
                <button 
                  onClick={() => {
                    email.actions?.onApprove();
                    onDismiss(email.id);
                  }}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white text-xs font-bold py-2 px-3 rounded shadow-sm transition-colors"
                >
                  Approve as {email.actions.label}
                </button>
                <button 
                  onClick={() => {
                    email.actions?.onReject();
                    onDismiss(email.id);
                  }}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-2 px-3 rounded shadow-sm transition-colors"
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default EmailToast;
