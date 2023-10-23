import { Html5QrcodeScanner } from "html5-qrcode";
import React, { useEffect, useState } from 'react'

const HtmlScanner = () => {
  const [scanResult, setScanResult] = useState(null);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner('reader', {
      qrbox: {
        width: 250,
        height: 250,
      },
      fps: 5,
    });

    scanner.render(onScanSuccess, onScanError);

    function onScanSuccess(result) {
      scanner.clear();
      setScanResult(result);
    }

    function onScanError(err) {
      console.warn(err);
    }
  }, []);

  return (
    <div>
      {scanResult ? (
        <div>
          Success: <a href={"http://" + scanResult}>{scanResult}</a>
        </div>
      ) : (
        <div id="reader"></div>
      )}
    </div>
  );
}

export default HtmlScanner;
