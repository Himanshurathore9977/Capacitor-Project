import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { Example } from 'first-plugin';
function App() {
  const [value, setValue] = useState();
  const [value2, setValue2] = useState();
  const [isAuthenticationExpire, setIsAuthenticationExpire] = useState(true);
  useEffect(() => {
    // auth();
    // isAuthenticated();
    //testPlugin();
    // isAuthenticationExpired();
    //console.log("Inside Use Effect")
    //setValue("value ");
  })
  async function testPlugin() {
    let response;
    try {
      response = await Example.echo({ value: "Hello from plugin!" });
      setValue(response.value);
      console.log("Plugin Response:", response);
    } catch (error) {
      setValue(error);
      console.error("Error using plugin:", error);
    }

    return response.value
  }

  async function isAuthenticated() {
    let response;
    try {
      response = await Example.isAuthenticated();
      setValue2(response.isAuthenticated);
      console.log("isAuthenticated Response:", response);
    } catch (error) {
      setValue(error);
      console.error("Error in checking isAuthenticated :", error);
    }
    return response.isAuthenticated
  }

  async function isAuthenticationExpired() {
    let response;
    try {
      response = await Example.isAuthenticationExpired();
      setIsAuthenticationExpire(response.isAuthenticationExpired);
      console.log("isAuthenticationExpired Response:", response);
    } catch (error) {
      setValue(error);
      console.error("Error in checking isAuthenticationExpired:", error);
    }
    return response.isAuthenticationExpired
  }
  // const toSha256String = (signature = string, payload = string) => {
  //   try {
  //     // Create HMAC using 'sha256' and the provided signature as the key
  //     const hmac = QuickCrypto.createHmac('sha256', signature);
  //     // Update the HMAC with the payload
  //     hmac.update(payload);
  //     // Generate the HMAC digest and convert it to a hex string
  //     const hash = hmac.digest('hex');
  //     return hash;
  //   } catch (error) {
  //     console.error('Error generating SHA256 string:', error);
  //     return '';
  //   }
  // }


  async function auth() {
    try {
      const isAuth = await Example.isAuthenticated();
      console.log('isAuth', isAuth.authenticate);
      // Check if authentication token has expired
      const isAuthExpired = await Example.isAuthenticationExpired();
      console.log('isAuthExpired', isAuthExpired.isAuthenticationExpired);
      //generate payload for authentication
      const payload = await Example.generatePayload();
      const pay = String(payload.generatePayload);
      const apiKey = "EPhPPsbv7e";
      const secretKey = "9lHCnkfeLl";
      
      const signature = await Example.toSha256String({
          secretKey: secretKey,
          payload: pay
      });
      setValue2(signature.signature);  
      const externalId = "";
      // Authenticate user
      if (!isAuth.isAuthenticated || isAuthExpired.isAuthenticationExpired) {
        await Example.authenticate({
          apiKey: apiKey,
          payload: pay, 
          signature: signature.signature, 
          externalId: externalId
        });
      }
      // If user is authenticated successfully
      const initAuth = await Example.initAuthentication();
      setValue2("Auth success");  
      console.log('initAuth', initAuth.initAuthentication);
    } catch (error) {
      setValue2("Auth fail");
      console.log('error', error);
    }

  }
  return (
    <div className="App">
      <h1> Hello Devs </h1>
      <h2> {value}</h2>
      <h2> {value2}</h2>
      <h2> {isAuthenticationExpire}</h2>

      <button onClick={() => auth()}>Click to Auth </button>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
