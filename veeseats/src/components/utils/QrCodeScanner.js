import React, { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { toast } from 'sonner';

const QrCodeScanner = ({handleQrscanner, myref, axiosInstance, visitorsname, fetchvisitors, setVisitationdata}) => {
    const scannerRef = useRef(null);
    const [scanResult, setScanResult] = useState(null);
    const [scanError, setScanError] = useState(null);
    const [retry, setRetry ] = useState(false);
    const [load, setLoad ] = useState(false);
    
    
    async function sendscandata(id){


      // alert(id)
      if(id){
    
        const payload = {
          "post_id": selectedid,
          "tag_id": id
      }
        try {
          const response = await  axiosInstance.post(`/verifyvisitor`, payload)
          console.log(response.data); // Assuming the response data contains useful information
          scanner.clear();
      
        } catch (error) {

        }
      
      }
    else{
alert('ss')
       
    }

  }

function setqr(){
  setRetry(false)
  setLoad(true)
  var confirmation = confirm(`confirm that you are about to assign tag ${decodedText} to ${visitorsname}`)
  if (confirmation){
  
  const payload = {
      "post_id": myref,
      "tag_id": scanResult
  }
  try {
    const response =  axiosInstance.post(`/verifyvisitor`, payload);
    console.log(response.data); // Assuming the response data contains useful information
    // scanner.clear();
    setRetry(false)
    setLoad(false)

  } catch (error) {
console.log(error)
setLoad(false)
setRetry(true)
  }


    // scanner.clear();
  }
}

useEffect(() => {
  const onScanSuccess = async (decodedText, decodedResult) => {
    console.log(`Scan result: ${decodedText}`, decodedResult);
    setScanResult({ decodedText });
    var confirmation = confirm(`Confirm that you are about to assign tag ${decodedText} to ${visitorsname}`);
    if (confirmation) {
      setLoad(true);
      const payload = {
        "post_id": myref,
        "tag_id": decodedText
      };
      try {
        const response = await axiosInstance.post(`/verifyvisitor`, payload);
        console.log(response.data); // Assuming the response data contains useful information
        setLoad(false);
     
        toast.info(response?.data?.message);
        if(response.data.available){
          handleQrscanner();
          fetchvisitors();
          scanner.clear();
          setVisitationdata(response.data.visitorsdata);
        }

      } catch (error) {
        console.log(error);
        setLoad(false);
        setRetry(true);
      }
    }
    setScanError(null); // Clear any previous errors
  };

  const onScanFailure = (error) => {
    console.warn(`Scan error: ${error}`);
    setScanError(error);
  };

  const scanner = new Html5QrcodeScanner(
    'qr-code-scanner', 
    { fps: 10, qrbox: 250 },
    false
  );

  scanner.render(onScanSuccess, onScanFailure);

  // Clean up the scanner when the component is unmounted
  return () => {
    scanner.clear().catch(error => {
      console.error('Failed to clear html5QrcodeScanner.', error);
    });
  };
}, [visitorsname, myref]);

  return (
<div className="loading-over2" id="lover" style={{ display: "flex" }} ref={scannerRef}>
  <div className="popup">
    <span className="mcls" onClick={handleQrscanner}>
    <span className="material-symbols-outlined">
close
</span>
    </span>
    <div id="qr-code-scanner"  />
    <div className="col" style={{ padding: 10 }}>
      <h4>Scan Result </h4>
      <div id="result">
      {scanResult && (
   

          <p>Decoded Text: {scanResult.decodedText}</p>


      )}
      {scanError && (
        // <div>
        //   <h3>Scan Error</h3>
        //   <small>{scanError}</small>
        // </div>
        ''
      )}

      </div>
    </div>
    {/* <button id="toggleFlashlight" onclick="toggleFlashlight()">Toggle Flashlight</button> */}
    {load && (   
     <div className="loginfrm">
      
      <button id="loadingBtn" style={{ display: "flex" }} disabled="">
   <span className='loading-spinner'></span> Loading
    </button>

    </div>
    ) }
    {retry && !load && (   
       <div className="bbtn">
      

      <button onClick={setqr}>Retry</button>
    </div>)

    }

  </div>
</div>



  );
};

export default QrCodeScanner;
