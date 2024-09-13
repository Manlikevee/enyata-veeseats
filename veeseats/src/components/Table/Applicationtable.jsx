import React, { useState, useMemo } from 'react';
import { PaystackButton } from 'react-paystack';
import { toast } from 'sonner';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  if (isNaN(date)) {
    const today = new Date();
    return `${String(today.getDate()).padStart(2, '0')}-${today.toLocaleString('en-US', { month: 'long' })}-${today.getFullYear()}`;
  }
  return `${String(date.getDate()).padStart(2, '0')}-${date.toLocaleString('en-US', { month: 'long' })}-${date.getFullYear()}`;
};

const Applicationtable = ({
  axiosInstance,
  jobtitle,
  jobservice,
  userdata,
  datecreated,
  datemodified,
  status,
  location_state,
  location_lga,
  myref
}) => {
  const [reference, setReference] = useState(null);

  const handleUpdatestatus = async (myrf) => {
    const payload = { ref: myrf, roleref: myref };
    try {
      const response = await axiosInstance.post('/payforpost/', payload);
      console.log('Response:', response.data);
      toast.success('Job paid for successfully');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to update job status. Please try again.');
    }
  };

  const publicKey = 'pk_test_5cff1482a437c3feb9114d509f327eda9366d37e';
  const componentProps = useMemo(() => ({
    email: userdata?.email || '',
    amount: 20000 * 100,
    metadata: {
      'Payment For': jobtitle,
      'Contact Email': userdata?.email || '',
    },
    publicKey,
    text: 'Pay Now',
    onSuccess: ({ reference }) => {
      setReference(reference);
      handleUpdatestatus(reference);
    },
    onClose: () => alert("Wait! You need this, don't go!!!!"),
  }), [jobtitle, userdata]); // Memoize componentProps to avoid unnecessary re-renders

  return (
    <div className="invoicetable">
      <div className="invdata">
        <div className="twostep">
          <div className="stepone">{jobtitle}</div>
          <div className="dservice">{jobservice}</div>
        </div>
      </div>
      <div className="invdata">
        <div className="twostep">
          <div className="stepone">{formatDate(datemodified)}</div>
        </div>
      </div>
      <div className="invdata">
        <div className="twostep">
          {status ? (
            <div className="stepone tablepill openpill">
              <span className="material-symbols-outlined">radio_button_checked</span> Open
            </div>
          ) : (
            <div className="stepone tablepill unpublishedpill">
              <span className="material-symbols-outlined">radio_button_checked</span> Pending
            </div>
          )}
          <div className="dservice">{formatDate(datecreated)}</div>
        </div>
      </div>
      <div className="invdata">
        <div className="twostep">
          <div className="stepone">{location_state}</div>
          <div className="dservice">{location_lga} </div>
        </div>
      </div>
      {status ? (
        <div className="invdata">
          <button className='mybtn'>Close Role</button>
        </div>
      ) : (
        <div className="invdata invbtn">
          <PaystackButton className="mybtn whitebtns" {...componentProps} />
        </div>
      )}
    </div>
  );
};

export default Applicationtable;
