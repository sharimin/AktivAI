import { Magic } from 'magic-sdk';
import { useState } from 'react';

const ConnectMagicWalletButton = () => {
  const [email, setEmail] = useState('');
  const [publicAddress, setPublicAddress] = useState('');

  const handleConnectMagicWallet = async () => {
    // Initialize Magic instance
    const magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_LINK_API_KEY);

    // Prompt user for email
    const email = prompt('Please enter your email');

    // Log in user with Magic Link
    await magic.auth.loginWithMagicLink({ email });

    // Retrieve user's public Ethereum address
    const metadata = await magic.user.getMetadata();
    setPublicAddress(metadata.publicAddress);

    // Save user's Ethereum address in backend
    // axios.post('https://aktivai.web.app/save-ethereum-address', {
    //   email,
    //   publicAddress: metadata.publicAddress,
    // });
  };

  return (
    <div>
      <button onClick={handleConnectMagicWallet}>Connect Magic Wallet</button>
      {publicAddress && <p>Connected: {publicAddress}</p>}
    </div>
  );
};
