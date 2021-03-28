import React from "react";
import { Card, Typography } from "antd";

export const UserInstructions = () => {
  return (
    <Card bodyStyle={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
      <Typography.Title level={2}>👨‍🏫 How to use this demo</Typography.Title>
      <Typography.Title level={3}>⚙ Configure Mumbai testnet on Metamask</Typography.Title>
      <Typography.Text>
        This demo is deployed on the Mumbai testnet. Follow{" "}
        <a href="https://docs.matic.network/docs/develop/metamask/testnet/">these instructions</a> to add the Mumbai
        testnet to your Metamask config.{" "}
      </Typography.Text>
      <Typography.Title level={3}>🤑 Fund your wallet!</Typography.Title>
      <Typography.Text>
        Go to the <a href="https://faucet.matic.network/">faucet</a> and send yourself some testnet MATIC.
      </Typography.Text>
      <Typography.Text>
        The smart contract is already funded with testnet LINK to pay for the image moderation work.
      </Typography.Text>
      <Typography.Title level={3}>🔗 Connect Metamask to app</Typography.Title>
      <Typography.Text>
        Press the 'Connect' button in the top-right corner to connect Metamask to this app.
      </Typography.Text>
      <Typography.Title level={3}>You should now be able to upload and submit an image! 🥳</Typography.Title>
    </Card>
  );
};
