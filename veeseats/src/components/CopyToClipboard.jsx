import React from 'react';
import { Toaster, toast } from "sonner"; // Optional: for notification

const CopyToClipboard = ({myid}) => {
    const textToCopy = `https://veeseats.vercel.app/veeseats/user-profile/${myid}`; 

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(textToCopy); // Use the Clipboard API
            toast.success('Text copied to clipboard!'); // Show success message
        } catch (err) {
            toast.error('Failed to copy text!'); // Show error message
            console.error('Failed to copy: ', err);
        }
    };

    return (
        <div>
            {/* <p>{textToCopy}</p> */}
            <button onClick={copyToClipboard} className='login balanced'><span className="material-symbols-outlined">
share
</span>  Share Profile</button>
        </div>
    );
};

export default CopyToClipboard;
